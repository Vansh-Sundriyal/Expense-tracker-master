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

module.exports = {
  getExpenses,
  addExpense,
};