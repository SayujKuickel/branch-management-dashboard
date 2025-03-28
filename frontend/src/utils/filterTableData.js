export function filterTableData(data, headers, text) {
  const excludedValues = ["options", "sn", "sn."];

  const filterHeaders = headers.filter(
    (item) => !excludedValues.includes(item)
  );

  return data.filter((item) =>
    filterHeaders.some((heading) => {
      const value = item[heading];
      return (
        value &&
        value
          .toString()
          .trim()
          .toLowerCase()
          .includes(text.trim().toLowerCase())
      );
    })
  );
}
