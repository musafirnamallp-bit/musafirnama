import assert from "node:assert/strict";
import test from "node:test";
import { productionQuoteEndpoint, quoteEndpoint } from "../src/lib/quoteEndpoint.ts";

test("production always uses the original backend, regardless of mock environment settings", () => {
  assert.equal(quoteEndpoint(false, "http://127.0.0.1:4174/quotes"), productionQuoteEndpoint);
  assert.equal(quoteEndpoint(false, "https://attacker.example/quotes"), productionQuoteEndpoint);
  assert.equal(quoteEndpoint(true), productionQuoteEndpoint);
});

test("development override only accepts local HTTP servers and fails closed on invalid URLs", () => {
  assert.equal(quoteEndpoint(true, "http://127.0.0.1:4174/quotes"), "http://127.0.0.1:4174/quotes");
  assert.equal(quoteEndpoint(true, "http://localhost:4174/quotes"), "http://localhost:4174/quotes");
  for (const url of ["invalid", "https://attacker.example/quotes", "http://localhost.attacker.example/quotes", "http://user:password@localhost:4174/quotes", "http://localhost:4174/quotes#fragment", "file:///tmp/quotes"]) assert.throws(() => quoteEndpoint(true, url));
});
