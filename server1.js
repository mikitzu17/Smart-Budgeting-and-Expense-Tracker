const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/budgetDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Expense Schema & Model
const ExpenseSchema = new mongoose.Schema({
  amount: Number,
  category: String,
  date: { type: Date, default: Date.now }
});

const Expense = mongoose.model("Expense", ExpenseSchema);

// API Route to Add Expense
app.post("/expenses", async (req, res) => {
    try {
        const { name, amount, category } = req.body;
        const newExpense = new Expense({ name, amount, category });
        await newExpense.save();
        res.status(201).json(newExpense);
    } catch (error) {
        res.status(500).json({ error: "Failed to add expense" });
    }
});


// API Route to Get All Expenses
app.get("/expenses", async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Homepage Route (Add this before app.listen)
app.get("/", (req, res) => {
  res.send("Welcome to the Smart Budgeting API!");
});

// Start the Server
app.listen(5001, () => console.log("Server running on port 5001"));


