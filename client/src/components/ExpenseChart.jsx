import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";

export default function ExpenseChart({
  expenses,
}) {
  const categoryTotals = {};

  expenses.forEach((expense) => {
    categoryTotals[expense.category] =
      (categoryTotals[expense.category] || 0) +
      Number(expense.amount);
  });

  const chartData = Object.entries(
    categoryTotals
  ).map(([category, amount]) => ({
    name: category,
    value: amount,
  }));

  const COLORS = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#ff8042",
    "#0088fe",
  ];

  return (
    <div className="bg-white rounded shadow p-4 h-[350px] md:h-[450px] overflow-hidden w-full">
      <h2 className="font-semibold mb-4">
        Expenses By Category
      </h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            outerRadius={80}
            label
          >
            {chartData.map(
              (_, index) => (
                <Cell
                  key={index}
                  fill={
                    COLORS[
                      index %
                        COLORS.length
                    ]
                  }
                />
              )
            )}
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}