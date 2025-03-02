import React, { useState } from "react";
import axios from "axios";

const AddExpense = () => {
  const [expense, setExpense] = useState({
    name: "",
    amount: "",
    category: "",
  });

  const handleChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5001/expenses", expense);
      alert("Expense added successfully!");
      setExpense({ name: "", amount: "", category: "" }); // Reset form
    } catch (error) {
      console.error("Error adding expense:", error);
      alert("Failed to add expense!");
    }
  };

  return (
    <div>
      <h2>Add Expense</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Expense Name"
          value={expense.name}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={expense.amount}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={expense.category}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Expense</button>
      </form>
    </div>
  );
};

export default AddExpense;
