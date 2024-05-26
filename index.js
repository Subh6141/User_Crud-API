const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const morgan = require("morgan");
const helmet = require("helmet");
const authRouter = require("./routes/auth");
const notesRouter = require("./routes/Notes");

const app = express();

dotenv.config();

const PORT = process.env.PORT || 8000;

// Add Middleware
app.use(express.json());
app.use(morgan("common"));
app.use(helmet());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected successfully");

    // Use the auth router
    app.use("/api/auth", authRouter);
    app.use("/api/notes", notesRouter);

    // Start the server only after successful database connection
    app.listen(PORT, () => {
      console.log(`App is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });
