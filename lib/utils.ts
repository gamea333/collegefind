/**
 * Merges class names, filtering out falsy values.
 */
export function cn(...classes: (string | undefined | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Formats a number using Indian locale grouping (e.g. 12,34,567).
 */
export function formatNumber(n: number): string {
  return n.toLocaleString("en-IN");
}

/**
 * Formats annual fees for display.
 * Under ₹1 lakh: "₹X,XXX/year"; at or above: "₹X.XL/year".
 */
export function formatFees(fees: number): string {
  if (fees < 100000) {
    return `₹${formatNumber(fees)}/year`;
  }
  const lakhs = fees / 100000;
  return `₹${lakhs.toFixed(1)}L/year`;
}

/**
 * Formats average package in lakhs (e.g. "₹18.5L per annum").
 */
export function formatPackage(pkg: number): string {
  const lakhs = pkg / 100000;
  return `₹${lakhs.toFixed(1)}L per annum`;
}
