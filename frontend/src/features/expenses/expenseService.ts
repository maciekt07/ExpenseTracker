import axios from "axios";
import { Expense } from "../../types/types";

const API_URL = "api/expenses/";

// Reusable config function
const createConfig = (token: string) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// Create new expense
const createExpense = async (expenseData: Expense, token: string) => {
  const response = await axios.post(API_URL, expenseData, createConfig(token));
  return response.data;
};

// get user expenses
const getExpenses = async (token: string) => {
  const response = await axios.get(API_URL, createConfig(token));
  return response.data;
};

// delete expense
const deleteExpense = async (expenseId: string, token: string) => {
  const response = await axios.delete(API_URL + expenseId, createConfig(token));
  return response.data;
};

const expenseService = {
  createExpense,
  getExpenses,
  deleteExpense,
};
export default expenseService;
