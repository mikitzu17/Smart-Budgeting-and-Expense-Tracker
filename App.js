import { useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import "./styles.css";


function App() {
  // State for budget and expenses
  const [budget, setBudget] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [theme, setTheme] = useState("light"); // Light/Dark mode state

  // Add Expense Function
  const addExpense = (expense) => {
    setExpenses([...expenses, expense]);
  };

  // Delete Expense Function
  const deleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  // Calculate Total Expenses
  const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0);
  const remainingBudget = budget - totalExpenses;

  // Toggle Light/Dark Mode
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className={theme}>
      <h1>Smart Budgeting Tracker</h1>

      {/* Dark Mode Toggle */}
      <button onClick={toggleTheme}>
        {theme === "light" ? "Dark Mode 🌙" : "Light Mode ☀️"}
      </button>

      {/* Budget Input */}
      <div>
        <h2>Total Budget: ₹{budget}</h2>
        <input
          type="number"
          placeholder="Enter Budget"
          value={budget}
          onChange={(e) => setBudget(Number(e.target.value))}
        />
      </div>

      {/* Remaining Budget */}
      <h2>Remaining Budget: ₹{remainingBudget}</h2>

      {/* Expense Form */}
      <ExpenseForm addExpense={addExpense} />

      {/* Expense List */}
      <ExpenseList expenses={expenses} deleteExpense={deleteExpense} />
    </div>
  );
}

export default App;
