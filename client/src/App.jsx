import { useEffect, useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseTable from "./components/ExpenseTable";
import SummaryPanel from "./components/SummaryPanel";
import FilterBar from "./components/FilterBar";
import ExpenseChart from "./components/ExpenseChart";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import EmptyState from "./components/EmptyState";
import ChartPlaceholder from "./components/ChartPlaceholder";
import { exportToCSV } from "./utils/exportCSV";
import {
  createExpense,
  deleteExpense,
  getExpenses,
  updateExpense,
} from "./services/api";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingExpense, setEditingExpense] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedRange, setSelectedRange] = useState("all");

  const filteredExpenses = expenses.filter((expense) => {
    const categoryMatch =
      selectedCategory === "all" || expense.category === selectedCategory;
    const expenseDate = new Date(expense.date);
    const today = new Date();

    let dateMatch = true;

    switch (selectedRange) {
      case "thisMonth":
        dateMatch =
          expenseDate.getMonth() === today.getMonth() &&
          expenseDate.getFullYear() === today.getFullYear();
        break;

      case "previousMonth": {
        const previousMonth = new Date(
          today.getFullYear(),
          today.getMonth() - 1,
        );

        dateMatch =
          expenseDate.getMonth() === previousMonth.getMonth() &&
          expenseDate.getFullYear() === previousMonth.getFullYear();
        break;
      }

      case "last6Months": {
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

        dateMatch = expenseDate >= sixMonthsAgo;
        break;
      }

      case "thisYear":
        dateMatch = expenseDate.getFullYear() === today.getFullYear();
        break;

      case "previousYear":
        dateMatch = expenseDate.getFullYear() === today.getFullYear() - 1;
        break;

      default:
        dateMatch = true;
    }

    return categoryMatch && dateMatch;
  });

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const data = await getExpenses();
      setExpenses(data);
    } finally {
      setLoading(false);
    }
  };

  const handleAddExpense = async (expense) => {
    await createExpense(expense);
    toast.success("Expense added successfully");
    fetchExpenses();
  };

  const handleDeleteExpense = async (id) => {
    await deleteExpense(id);
    toast.success("Expense deleted successfully");
    fetchExpenses();
  };

  const handleUpdateExpense = async (id, updatedExpense) => {
    await updateExpense(id, updatedExpense);
    toast.success("Expense updated successfully");
    fetchExpenses();

    setEditingExpense(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="text-center">
          <lord-icon
            src="https://cdn.lordicon.com/msoeawqm.json"
            trigger="loop"
            delay="1000"
            style={{
              width: "120px",
              height: "120px",
            }}
          />

          <h2 className="text-xl font-semibold mt-4">Loading Expenses...</h2>

          <p className="text-gray-500 mt-2">Waking up server if needed.</p>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-slate-100 p-3 md:p-6 overflow-x-hidden">
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="font-black text-2xl sm:text-3xl flex items-center">
            <span className="text-slate-500 text-4xl sm:text-5xl">&lt;/</span>
            <span className="text-blue-600 text-3xl sm:text-4xl">e</span>
            <span className="text-slate-800 text-4xl sm:text-5xl">X</span>
            <span className="text-blue-600 text-3xl sm:text-4xl">p</span>
            <span className="text-slate-500 text-4xl sm:text-5xl">&gt;</span>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-bold leading-tight">
              <span className="text-blue-600">Expense</span>
              <span className="text-slate-800"> Tracker</span>
              <span className="text-blue-600"> Master</span>
            </h1>
          </div>
        </div>
      </div>

      <ExpenseForm
        onAdd={handleAddExpense}
        editingExpense={editingExpense}
        onUpdate={handleUpdateExpense}
      />

      <SummaryPanel expenses={filteredExpenses} />

      <div className="mb-4">
        <h2 className="text-lg font-semibold">Analytics & Transactions</h2>
        <p className="text-gray-500 text-sm">
          Showing results for selected filters
        </p>
      </div>

      <FilterBar
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedRange={selectedRange}
        setSelectedRange={setSelectedRange}
        onExport={() => exportToCSV(filteredExpenses)}
      />

      <div className="grid lg:grid-cols-3 gap-4 md:gap-6 w-full">
        <div className="lg:col-span-1 min-w-0 w-full">
          {selectedCategory === "all" ? (
            <ExpenseChart expenses={filteredExpenses} />
          ) : (
            <ChartPlaceholder selectedCategory={selectedCategory} />
          )}
        </div>

        <div className="lg:col-span-2 min-w-0 w-full">
          {filteredExpenses.length === 0 ? (
            <EmptyState />
          ) : (
            <ExpenseTable
              expenses={filteredExpenses}
              onDelete={handleDeleteExpense}
              onEdit={setEditingExpense}
            />
          )}
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={2500} theme="light" />
    </div>
  );
}

export default App;
