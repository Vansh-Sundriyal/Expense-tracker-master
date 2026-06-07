import { useState } from "react";
import { useEffect } from "react";
import ExpenseForm from "./services/components/ExpenseForm";
import ExpenseTable from "./services/components/ExpenseTable";
import { createExpense, deleteExpense, getExpenses } from "./services/api";

function App() {
  const [expenses, setExpenses] = useState([]);

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

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <h1 className="text-5xl font-bold text-blue-600">Expense Tracker</h1>

      <ExpenseForm onAdd={handleAddExpense} />

      <ExpenseTable expenses={expenses} onDelete={handleDeleteExpense} />
    </div>
  );
}

export default App;
