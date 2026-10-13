import assert from "node:assert/strict";
import test from "node:test";
import { addTripDays, emptyQuote, quoteFromSearch, quotePayload, tripDays, validateQuote } from "../src/lib/quoteForm.ts";
import { isQuoteAccepted } from "../src/lib/quoteResponse.ts";

const validQuote = () => ({
  ...emptyQuote(), destination: "Goa", travelers: "2", startDate: "2026-12-10", endDate: "2026-12-14",
  budget: "250000", name: "Test Traveler", email: "traveler@example.com", phone: "+91 (98765) 43210",
});

test("package links retain destination, price above one lakh and duration", () => {
  const values = quoteFromSearch(new URLSearchParams({ destination: "Bali", budget: "₹1,25,999/-", duration: "5N - 6D", package: "Bali Escape" }));
  assert.equal(values.destination, "Bali");
  assert.equal(values.budget, "125999");
  assert.equal(values.duration, "6");
  assert.equal(values.packageName, "Bali Escape");
  assert.equal(quoteFromSearch(new URLSearchParams({ package: "bali-indonesia", packageName: "Bali Escape" })).packageName, "Bali Escape");
  assert.equal(quoteFromSearch(new URLSearchParams("travelers=-5&duration=Infinity&budget=NaN")).travelers, "2");
});

test("validates real dates, order, email, international phone and high budgets", () => {
  assert.deepEqual(validateQuote(validQuote(), "2026-10-13"), {});
  const errors = validateQuote({ ...validQuote(), startDate: "2026-02-30", endDate: "2026-02-29", travelers: "2.5", budget: "Infinity", email: "bad-email", phone: "123" }, "2026-01-01");
  for (const field of ["startDate", "endDate", "travelers", "budget", "email", "phone"]) assert.ok(errors[field], field);
  assert.ok(validateQuote({ ...validQuote(), endDate: "2026-12-09" }, "2026-10-13").endDate);
  assert.ok(validateQuote({ ...validQuote(), startDate: "2026-10-12" }, "2026-10-13").startDate);
});

test("flexible dates remain optional and are explicit in existing payload requirements", () => {
  const values = { ...validQuote(), flexibleDates: true, startDate: "", endDate: "", duration: "5", interests: ["Beach"], preferredContact: "email" };
  assert.deepEqual(validateQuote(values, "2026-10-13"), {});
  const payload = quotePayload(values);
  assert.equal(payload.startDate, "");
  assert.equal(payload.endDate, "");
  assert.match(payload.requirements, /dates are flexible/);
  assert.match(payload.requirements, /5 days/);
  assert.match(payload.requirements, /Beach/);
  assert.match(payload.requirements, /Preferred contact: email/);
});

test("keeps original API fields, numeric values, digit-only phone and PPP dates", () => {
  const payload = quotePayload(validQuote());
  assert.deepEqual(Object.keys(payload).sort(), ["destination", "travelers", "startDate", "endDate", "budget", "accommodation", "travelMode", "requirements", "name", "email", "phone"].sort());
  assert.equal(payload.startDate, "December 10th, 2026");
  assert.equal(payload.endDate, "December 14th, 2026");
  assert.equal(payload.travelers, 2);
  assert.equal(payload.budget, 250000);
  assert.equal(payload.phone, "919876543210");
});

test("duration math works across leap day, month boundaries and reversed dates", () => {
  assert.equal(addTripDays("2028-02-28", 3), "2028-03-01");
  assert.equal(tripDays("2028-02-28", "2028-03-01"), 3);
  assert.equal(tripDays("2026-12-31", "2027-01-02"), 3);
  assert.equal(tripDays("2026-12-15", "2026-12-14"), null);
  assert.equal(addTripDays("2026-02-30", 5), "");
});

test("only explicit API acceptance counts as a lead", () => {
  for (const response of [{ statusCode: 200 }, { statusCode: "201", body: '{"message":"Accepted"}' }, { statusCode: 202 }]) assert.equal(isQuoteAccepted(response), true);
  for (const response of [undefined, null, "OK", "<html>Error</html>", {}, { success: true }, { status: 200 }, { statusCode: 500 }, { statusCode: 200, success: false }, { statusCode: 200, body: '{"error":"delivery failed"}' }, { statusCode: 200, body: { statusCode: 400 } }, { statusCode: 200, body: { status: "failed" } }]) assert.equal(isQuoteAccepted(response), false, JSON.stringify(response));
});
