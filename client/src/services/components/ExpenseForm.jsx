import { useState, useEffect } from "react";

export default function ExpenseForm({ onAdd, editingExpense, onUpdate }) {
  const [formData, setFormData] = useState({
    amount: "",
    category: "Food",
    date: "",
    note: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingExpense) {
      onUpdate(editingExpense.id, formData);
    } else {
      onAdd(formData);
    }

    setFormData({
      amount: "",
      category: "Food",
      date: "",
      note: "",
    });
  };

  useEffect(() => {
    if (editingExpense) {
      setFormData({
        amount: editingExpense.amount,
        category: editingExpense.category,
        date: editingExpense.date,
        note: editingExpense.note,
      });
    }
  }, [editingExpense]);

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6">
      <input
        type="number"
        placeholder="Amount"
        value={formData.amount}
        onChange={(e) =>
          setFormData({
            ...formData,
            amount: e.target.value,
          })
        }
        className="border p-2 mr-2"
      />

      <select
        value={formData.category}
        onChange={(e) =>
          setFormData({
            ...formData,
            category: e.target.value,
          })
        }
        className="border p-2 mr-2"
      >
        <option>Food</option>
        <option>Transport</option>
        <option>Bills</option>
        <option>Entertainment</option>
        <option>Other</option>
      </select>

      <input
        type="date"
        value={formData.date}
        onChange={(e) =>
          setFormData({
            ...formData,
            date: e.target.value,
          })
        }
        className="border p-2 mr-2"
      />

      <input
        type="text"
        placeholder="Note"
        value={formData.note}
        onChange={(e) =>
          setFormData({
            ...formData,
            note: e.target.value,
          })
        }
        className="border p-2 mr-2"
      />

      <button className="bg-blue-600 text-white px-4 py-2 rounded">Add</button>
    </form>
  );
}
