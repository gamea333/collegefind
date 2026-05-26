/**
 * Returns the index of the best value in a numeric array.
 */
export function getBestIndex(
  values: number[],
  direction: "min" | "max"
): number | null {
  if (values.length === 0) {
    return null;
  }

  const target =
    direction === "min" ? Math.min(...values) : Math.max(...values);

  const index = values.findIndex((value) => value === target);
  return index === -1 ? null : index;
}
