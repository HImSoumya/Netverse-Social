const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const userRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/posts");
const conversationRouter = require("./routes/conversations");
const messageRouter = require("./routes/messages");
const multer = require("multer");

const app = express();
dotenv.config();
const port = process.env.PORT || 8800;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("common"));
app.use(cors(
  {
    origin: 'http://localhost:5173/', // e.g., if deployed on Netlify or Vercel
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  }
));

app.use("/uploads", express.static("uploads"));

app.get("/netverse", (req, res) => {
  res.send("Backend is running 👍");
});

// Routes
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/conversations", conversationRouter);
app.use("/api/messages", messageRouter);

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
  console.log(`Server running on port ${port}`);
});
