import axios from "axios";
import type { QuotePayload } from "./quoteForm.ts";
import { isQuoteAccepted } from "./quoteResponse.ts";
import { quoteEndpoint } from "./quoteEndpoint.ts";

export class QuoteSubmissionError extends Error {
  readonly kind: "rejected" | "unconfirmed";

  constructor(kind: "rejected" | "unconfirmed") {
    super(kind === "rejected" ? "The enquiry was not accepted." : "The enquiry could not be confirmed.");
    this.name = "QuoteSubmissionError";
    this.kind = kind;
  }
}

// Keep the existing endpoint and payload contract. HTTP success alone does not
// prove that the application accepted the enquiry.
const submitData = async (data: QuotePayload, signal?: AbortSignal): Promise<void> => {
  let response;
  try {
    response = await axios.post(
      quoteEndpoint(import.meta.env?.DEV === true, import.meta.env?.VITE_QUOTE_API_URL),
      data,
      { timeout: 20000, signal, headers: { "Content-Type": "application/json" } },
    );
  } catch {
    throw new QuoteSubmissionError("unconfirmed");
  }
  if (response.status < 200 || response.status >= 300 || !isQuoteAccepted(response.data)) {
    throw new QuoteSubmissionError("rejected");
  }
};

export default submitData;
