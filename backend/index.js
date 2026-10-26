const dotenv = require("dotenv");
const environment = process.env.NODE_ENV || "development";
dotenv.config({ path: `.env.${environment}`});

const express = require("express");
const cors = require("cors");
const connectToDB = require("./config/dbConnection.js");
const todoRoutes = require("./routes/todoRoutes.js");

connectToDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const PORT = process.env.PORT;

app.use("/api/todos", todoRoutes);

app.get("/health", async (req, res) => {
  res.status(200).json({ message: "The /health route was called" });
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
