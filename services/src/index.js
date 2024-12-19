const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const userRouter = require("./routes/users");
const authRouter = require("./routes/auth");

const app = express();
dotenv.config();
port = process.env.PORT;

// middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

// Routes
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);

// DB-Connection
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB...");
  } catch (error) {
    console.log(error);
  }
}

connectDB();

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
