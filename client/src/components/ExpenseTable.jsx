export default function ExpenseTable({ expenses, onDelete, onEdit }) {
  return (
    <div className="bg-white rounded shadow overflow-hidden w-full">
      <div className="h-[450px] overflow-auto">
        <table className="w-full bg-white rounded shadow">
          <thead className="sticky top-0 bg-slate-100 z-10 whitespace-nowrap">
            <tr>
              <th className="px-4 py-3 text-left">Amount</th>
              <th className="px-4 py-3 text-left">Category</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Note</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="whitespace-nowrap">
            {expenses.map((expense) => (
              <tr key={expense.id} className="border-b hover:bg-slate-200">
                <td className="px-4 py-3">₹{expense.amount}</td>
                <td className="px-4 py-3">{expense.category}</td>
                <td className="px-4 py-3">{expense.date}</td>
                <td className="px-4 py-3">{expense.note || "—"}</td>

                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => onDelete(expense.id)}
                    className="px-2 py-1"
                  >
                    <lord-icon
                      title="Delete"
                      src="https://cdn.lordicon.com/skkahier.json"
                      trigger="hover"
                      colors="primary:#ef4444"
                      stroke="bold"
                      style={{
                        width: "24px",
                        height: "24px",
                        cursor: "pointer",
                      }}
                    />
                  </button>
                  <button
                    onClick={() => onEdit(expense)}
                    className="px-2 py-1"
                  >
                    <lord-icon
                      title="Edit"
                      src="https://cdn.lordicon.com/exymduqj.json"
                      trigger="hover"
                      colors="primary:#3b82f6"
                      stroke="bold"
                      style={{
                        width: "24px",
                        height: "24px",
                        cursor: "pointer",
                      }}
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}