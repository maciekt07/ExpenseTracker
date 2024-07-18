import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Expense from "../models/expense";

export const getAllExpenses = asyncHandler(
  async (req: Request, res: Response) => {
    const expenses = await Expense.find();
    res.status(200).json(expenses);
  }
);

export const createExpense = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.body.text) {
      res.status(400);
      throw new Error("Missing text");
    }
    if (!req.body.amount) {
      res.status(400);
      throw new Error("Missing amount");
    }

    if (req.body.amount < 0) {
      res.status(400);
      throw new Error("Amount cannot be negative");
    }

    const expense = Expense.create({
      text: req.body.text,
      amount: req.body.amount,
    });

    res.status(200).json(expense);
  }
);

export const updateExpense = asyncHandler(
  async (req: Request, res: Response) => {
    const expense = await Expense.findById(req.params.id);
    if (!expense) {
      res.status(400);
      throw new Error("Expense not found");
    }
    if (req.body.amount < 0) {
      res.status(400);
      throw new Error("Amount cannot be negative");
    }
    const updatedExpense = await Expense.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedExpense);
  }
);

export const deleteExpense = asyncHandler(
  async (req: Request, res: Response) => {
    const expense = await Expense.findById(req.params.id);
    if (!expense) {
      res.status(400);
      throw new Error("Expense not found");
    }
    await Expense.findByIdAndDelete(req.params.id);
    res.status(200).json(expense);
  }
);
