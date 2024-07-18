import express, { Request, Response } from "express";
import cors from "cors";
import { router } from "./routes/expenseRoutes";
import connectDB from "./config/db";
import { errorHandler } from "./middleware/errorMiddleware";
import "dotenv/config";

const app = express();

const port = process.env.PORT || 8000;

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/expenses", router);

app.use(errorHandler);

app.get("/", (req: Request, res: Response) => {
  res.send("hello world");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
