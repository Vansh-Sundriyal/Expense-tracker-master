export default function ExpenseTable({ expenses, onDelete, onEdit }) {
  return (
    <table className="w-full bg-white rounded shadow">
      <thead>
        <tr>
          <th>Amount</th>
          <th>Category</th>
          <th>Date</th>
          <th>Note</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {expenses.map((expense) => (
          <tr key={expense.id}>
            <td>{expense.amount}</td>
            <td>{expense.category}</td>
            <td>{expense.date}</td>
            <td>{expense.note}</td>

            <td>
              <button
                onClick={() => onDelete(expense.id)}
                className="text-red-500"
              >
                Delete
              </button>
              <button
                onClick={() => onEdit(expense)}
                className="text-blue-500 ml-3"
              >
                Edit
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
