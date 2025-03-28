export function formatTableHeaders(header) {
  const formatted = header.includes("_") ? header.split("_").join(" ") : header;

  return formatted;
}
