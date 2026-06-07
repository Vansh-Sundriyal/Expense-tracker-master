const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/expenses.json");

const getExpenses = (req, res) => {
  const expenses = JSON.parse(
    fs.readFileSync(filePath, "utf-8")
  );

  res.json(expenses);
};

const addExpense = (req, res) => {
  const expenses = JSON.parse(
    fs.readFileSync(filePath, "utf-8")
  );

  const newExpense = {
    id: Date.now().toString(),
    ...req.body,
  };

  expenses.push(newExpense);

  fs.writeFileSync(
    filePath,
    JSON.stringify(expenses, null, 2)
  );

  res.status(201).json(newExpense);
};


const updateExpense = (req, res) => {
  const expenses = JSON.parse(
    fs.readFileSync(filePath, "utf-8")
  );

  const { id } = req.params;

  const index = expenses.findIndex(
    expense => expense.id === id
  );

  if (index === -1) {
    return res.status(404).json({
      message: "Expense not found",
    });
  }

  expenses[index] = {
    ...expenses[index],
    ...req.body,
  };

  fs.writeFileSync(
    filePath,
    JSON.stringify(expenses, null, 2)
  );

  res.json(expenses[index]);
};

const deleteExpense = (req, res) => {
  const expenses = JSON.parse(
    fs.readFileSync(filePath, "utf-8")
  );

  const { id } = req.params;

  const filteredExpenses = expenses.filter(
    expense => expense.id !== id
  );

  if (filteredExpenses.length === expenses.length) {
    return res.status(404).json({
      message: "Expense not found",
    });
  }

  fs.writeFileSync(
    filePath,
    JSON.stringify(filteredExpenses, null, 2)
  );

  res.json({
    message: "Expense deleted",
  });
};

module.exports = {
  getExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
};