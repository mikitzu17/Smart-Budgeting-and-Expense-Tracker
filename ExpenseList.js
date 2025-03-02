import { useState } from "react";

const ExpenseList = ({ expenses, deleteExpense }) => {
  const [filter, setFilter] = useState("");

  // Filtered expenses
  const filteredExpenses = filter
    ? expenses.filter((expense) => expense.category === filter)
    : expenses;

  return (
    <div>
      <h2>Expense List</h2>

      {/* Filter by Category */}
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="">All Categories</option>
        <option value="Food">Food</option>
        <option value="Transport">Transport</option>
        <option value="Shopping">Shopping</option>
      </select>

      <ul>
        {filteredExpenses.map((expense) => (
          <li key={expense.id}>
          {expense.title} - ₹{expense.amount} ({expense.category}) 
          <button onClick={() => deleteExpense(expense.id)}>❌</button>
        </li>
        
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
