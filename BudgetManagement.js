import React, { useState, useEffect } from "react";
import { Container, Card, Typography, TextField, Button, List, ListItem, ListItemText } from "@mui/material";

const BudgetManagement = () => {
  const [budget, setBudget] = useState(1000);
  const [expenses, setExpenses] = useState([]);

  // Fetch expenses from backend
  useEffect(() => {
    fetch("http://localhost:5000/expenses")
      .then((res) => res.json())
      .then((data) => setExpenses(data))
      .catch((error) => console.error("Error fetching expenses:", error));
  }, []);

  // Calculate totals
  const totalExpenses = expenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
  const remainingBudget = budget - totalExpenses;

  return (
    <Container maxWidth="sm" style={{ marginTop: "20px" }}>
      <Card sx={{ p: 3, textAlign: "center", backgroundColor: "#f9f9f9", boxShadow: 3 }}>
        <Typography variant="h4" gutterBottom>
          Budget Management
        </Typography>

        {/* Editable Budget Input */}
        <TextField
          label="Total Budget ($)"
          type="number"
          value={budget}
          onChange={(e) => setBudget(Number(e.target.value))}
          fullWidth
          variant="outlined"
          sx={{ mb: 2 }}
        />

        <Typography variant="h6" color="primary">
          Total Expenses: ${totalExpenses}
        </Typography>
        <Typography variant="h6" color={remainingBudget < 0 ? "error" : "secondary"}>
          Remaining Budget: ${remainingBudget}
        </Typography>

        <Typography variant="h5" sx={{ mt: 3 }}>Expense List</Typography>
        <List>
          {expenses.length > 0 ? (
            expenses.map((expense, index) => (
              <ListItem key={index} divider>
                <ListItemText primary={expense.name} secondary={`$${expense.amount}`} />
              </ListItem>
            ))
          ) : (
            <Typography variant="body1" color="textSecondary">No expenses added yet.</Typography>
          )}
        </List>
      </Card>
    </Container>
  );
};

export default BudgetManagement;
