import express, { Request, Response } from "express";
import cors from "cors";
import { ExpenseRouter } from "./routes/expenseRoutes";
import connectDB from "./config/db";
import { errorHandler } from "./middleware/errorMiddleware";
import "dotenv/config";
import { UserRouter } from "./routes/userRoutes";
import path from "path";

const app = express();

const port = process.env.PORT || 8000;

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/expenses", ExpenseRouter);
app.use("/api/users", UserRouter);

app.use(errorHandler);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
