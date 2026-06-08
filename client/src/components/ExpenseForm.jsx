import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function ExpenseForm({ onAdd, editingExpense, onUpdate }) {
  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    amount: "",
    category: "Food",
    date: today,
    note: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.amount) {
      toast.error("Amount is required");
      return;
    }

    if (Number(formData.amount) <= 0) {
      toast.error("Amount must be greater than zero");
      return;
    }

    const selectedDate = new Date(formData.date);

    if (selectedDate > today) {
      toast.error("Future dates are not allowed");
      return;
    }

    if (!formData.category) {
      toast.error("Category is required");
      return;
    }

    if (editingExpense) {
      onUpdate(editingExpense.id, formData);
    } else {
      onAdd(formData);
    }

    setFormData({
      amount: "",
      category: "Food",
      date: today,
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
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow mb-6"
    >
      <div className="grid md:grid-cols-5 gap-4">
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
          max={new Date().toISOString().split("T")[0]}
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

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          {editingExpense ? "Update Expense" : "Add Expense"}
        </button>
      </div>
    </form>
  );
}
