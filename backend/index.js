import express from "express";
import cors from "cors";
import db from "./db/db.js";
import dotenv from "dotenv";
import book from "./routes/book.js";
import customer from "./routes/customer.js";
import supplier from "./routes/supplier.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/book", book)
app.use("/api/customer", customer)
app.use("/api/supplier", supplier)

app.listen(process.env.PORT, () =>
  console.log("Backend server running on port: " + process.env.PORT)
);

db.dbConnection();