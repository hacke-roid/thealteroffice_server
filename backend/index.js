require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// Import Routes
const authRoutes = require("./routers/authRouter.js");
const urlRoutes = require("./routers/urlRouter.js");
const analyticsRoutes = require("./routers/analyticsRouter.js");

const app = express();

// Middleware
app.use(express.json());

//^cors middleware

app.use(
  cors({
    origin: [
      "https://thealteroffice-client.vercel.app/",
      "http://localhost:3000",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
// app.options("*", cors());
app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://thealteroffice-client.vercel.app/"
  ); // Update with specific origin if needed
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

//! Page not found
// app.use("*", (req, res, next) => {
//   res.status(404).send({ message: "Page not found" });
// });

// //! Error handling
// app.use((err, req, res, next) => {
//   let emessages = err.message.split(":");
//   console.log(emessages);
//   let emessage = emessages[emessages.length - 1];
//   res.status(500).json({ error: true, message: emessage });
// });

// Routes

app.use("/api/auth", authRoutes);
app.use("/", urlRoutes);
app.use("/api/analytics", analyticsRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
