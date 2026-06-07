import { useState } from "react";
import { useEffect } from "react";
import ExpenseForm from "./services/components/ExpenseForm";
import ExpenseTable from "./services/components/ExpenseTable";
import SummaryPanel from "./services/components/SummaryPanel";
import FilterBar from "./services/components/FilterBar";
import {
  createExpense,
  deleteExpense,
  getExpenses,
  updateExpense,
} from "./services/api";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [selectedRange, setSelectedRange] = useState("all");

  const filteredExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);

    const today = new Date();

    switch (selectedRange) {
      case "thisMonth":
        return (
          expenseDate.getMonth() === today.getMonth() &&
          expenseDate.getFullYear() === today.getFullYear()
        );

      case "previousMonth": {
        const previousMonth = new Date(
          today.getFullYear(),
          today.getMonth() - 1,
        );

        return (
          expenseDate.getMonth() === previousMonth.getMonth() &&
          expenseDate.getFullYear() === previousMonth.getFullYear()
        );
      }

      case "last6Months": {
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

        return expenseDate >= sixMonthsAgo;
      }

      case "thisYear":
        return expenseDate.getFullYear() === today.getFullYear();

      case "previousYear":
        return expenseDate.getFullYear() === today.getFullYear() - 1;

      default:
        return true;
    }
  });

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    const data = await getExpenses();
    setExpenses(data);
  };

  const handleAddExpense = async (expense) => {
    await createExpense(expense);
    fetchExpenses();
  };

  const handleDeleteExpense = async (id) => {
    await deleteExpense(id);
    fetchExpenses();
  };

  const handleUpdateExpense = async (id, updatedExpense) => {
    await updateExpense(id, updatedExpense);

    fetchExpenses();

    setEditingExpense(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <h1 className="text-5xl font-bold text-blue-600">Expense Tracker</h1>

      <FilterBar
        selectedRange={selectedRange}
        setSelectedRange={setSelectedRange}
      />

      <SummaryPanel expenses={filteredExpenses} />

      <ExpenseTable expenses={filteredExpenses} />

      <ExpenseForm
        onAdd={handleAddExpense}
        editingExpense={editingExpense}
        onUpdate={handleUpdateExpense}
      />
    </div>
  );
}

export default App;
