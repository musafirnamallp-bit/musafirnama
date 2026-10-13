function readObject(value: unknown): Record<string, unknown> | null {
  if (typeof value === "string") {
    try {
      return readObject(JSON.parse(value));
    } catch {
      return null;
    }
  }
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? value as Record<string, unknown>
    : null;
}

function reportsFailure(value: Record<string, unknown> | null, depth = 0): boolean {
  if (!value || depth > 3) return false;
  if (value.success === false || value.accepted === false || value.error || value.errorMessage) return true;
  if (typeof value.status === "string" && ["error", "failed", "failure", "rejected"].includes(value.status.toLowerCase())) return true;
  if (value.statusCode !== undefined && Number(value.statusCode) >= 400) return true;
  return reportsFailure(readObject(value.body), depth + 1);
}

/** Existing API contract: response JSON contains an application statusCode. */
export function isQuoteAccepted(value: unknown): boolean {
  const result = readObject(value);
  if (!result || reportsFailure(result)) return false;
  const code = Number(result.statusCode);
  return Number.isInteger(code) && code >= 200 && code < 300;
}
