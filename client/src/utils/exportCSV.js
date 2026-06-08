export const exportToCSV = (expenses) => {
  if (expenses.length === 0) return;

  const headers = [
    "Amount",
    "Category",
    "Date",
    "Note",
  ];

  const rows = expenses.map((expense) => [
    expense.amount,
    expense.category,
    expense.date,
    expense.note || "",
  ]);

  const csvContent = [headers, ...rows]
    .map((row) => row.join(","))
    .join("\n");

  const blob = new Blob(
    [csvContent],
    { type: "text/csv;charset=utf-8;" }
  );

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;

  link.download = "expenses.csv";

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);

  URL.revokeObjectURL(url);
};