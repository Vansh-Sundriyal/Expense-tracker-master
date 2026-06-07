export default function SummaryPanel({ expenses }) {
  const today = new Date();

  const currentMonthExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);

    return (
      expenseDate.getMonth() === today.getMonth() &&
      expenseDate.getFullYear() === today.getFullYear()
    );
  });

  const totalSpentThisMonth = currentMonthExpenses.reduce(
    (sum, expense) => sum + Number(expense.amount),
    0
  );

  const highestExpense =
    expenses.length > 0
      ? Math.max(
          ...expenses.map((expense) =>
            Number(expense.amount)
          )
        )
      : 0;

  const categoryTotals = {};

  expenses.forEach((expense) => {
    categoryTotals[expense.category] =
      (categoryTotals[expense.category] || 0) +
      Number(expense.amount);
  });

  return (
    <div className="grid md:grid-cols-3 gap-4 mb-6">
      
      {/* Total This Month */}
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-gray-500 text-sm">
          Total This Month
        </h2>

        <p className="text-3xl font-bold mt-2">
          ₹{totalSpentThisMonth}
        </p>
      </div>

      {/* Highest Expense */}
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-gray-500 text-sm">
          Highest Expense
        </h2>

        <p className="text-3xl font-bold mt-2">
          ₹{highestExpense}
        </p>
      </div>

      {/* Category Totals */}
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-gray-500 text-sm mb-2">
          Category Totals
        </h2>

        {Object.keys(categoryTotals).length === 0 ? (
          <p className="text-gray-400">
            No expenses yet
          </p>
        ) : (
          Object.entries(categoryTotals).map(
            ([category, total]) => (
              <div
                key={category}
                className="flex justify-between py-1"
              >
                <span>{category}</span>

                <span className="font-medium">
                  ₹{total}
                </span>
              </div>
            )
          )
        )}
      </div>

    </div>
  );
}