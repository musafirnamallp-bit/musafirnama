import assert from "node:assert/strict";
import test from "node:test";
import axios from "axios";
import submitData, { QuoteSubmissionError } from "../src/lib/musafirnama.ts";

// Every request uses an in-memory Axios adapter. No external enquiry is sent.
const payload = { destination: "Goa", travelers: 2, startDate: "December 10th, 2026", endDate: "December 14th, 2026", budget: 250000, accommodation: "", travelMode: "", requirements: "", name: "Test Traveler", email: "traveler@example.com", phone: "919876543210" };

async function withAdapter(adapter, run) {
  const previous = axios.defaults.adapter;
  axios.defaults.adapter = adapter;
  try { await run(); } finally { axios.defaults.adapter = previous; }
}

test("posts the existing payload with timeout and cancellation, accepting explicit API success", async () => {
  const controller = new AbortController();
  await withAdapter(async config => {
    assert.equal(config.method, "post");
    assert.equal(config.timeout, 20000);
    assert.equal(config.signal, controller.signal);
    assert.deepEqual(JSON.parse(config.data), payload);
    return { data: { statusCode: 200 }, status: 200, statusText: "OK", headers: {}, config };
  }, async () => assert.equal(await submitData(payload, controller.signal), undefined));
});

test("HTTP 200 without explicit application acceptance never reports success", async () => {
  await withAdapter(async config => ({ data: {}, status: 200, statusText: "OK", headers: {}, config }), async () => {
    await assert.rejects(submitData(payload), error => error instanceof QuoteSubmissionError && error.kind === "rejected");
  });
});

test("non-success HTTP status cannot count as an accepted lead", async () => {
  await withAdapter(async config => ({ data: { statusCode: 200 }, status: 503, statusText: "Unavailable", headers: {}, config }), async () => {
    await assert.rejects(submitData(payload), error => error instanceof QuoteSubmissionError && error.kind === "rejected");
  });
});

test("timeout/network failure gives an unconfirmed result without exposing server details", async () => {
  await withAdapter(async () => { throw new Error("Private backend diagnostic"); }, async () => {
    await assert.rejects(submitData(payload), error => error instanceof QuoteSubmissionError && error.kind === "unconfirmed" && !error.message.includes("Private"));
  });
});

test("cancelled submissions never dispatch or count as accepted", async () => {
  const controller = new AbortController();
  controller.abort();
  await withAdapter(async () => { assert.fail("Cancelled request must not dispatch"); }, async () => {
    await assert.rejects(submitData(payload, controller.signal), error => error instanceof QuoteSubmissionError && error.kind === "unconfirmed");
  });
});
