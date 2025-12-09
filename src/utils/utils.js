export function formatPrice(num) {
  if (num === null || num === undefined) return "";

  return `${num < 0 ? "-" : ""}RM ${Math.abs(num).toLocaleString("en-US")}`;
}
