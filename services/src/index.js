const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const userRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/posts");
const multer  = require('multer')

const app = express();
dotenv.config();
port = process.env.PORT;

// middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(helmet());
app.use(morgan("common"));
app.use(cors());

app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);

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
