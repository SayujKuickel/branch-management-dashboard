const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const db = require("./models");
const studentRouter = require("./routes/studentRoutes");
const branchRouter = require("./routes/branchRoutes");
const miscRouter = require("./routes/miscRoutes");
const authRouter = require("./routes/authRoutes");
const { authenticateToken } = require("./middleware/authenticateToken");

const app = express();
const port = process.env.PORT;

// Middleware
app.use(express.json());
app.use(morgan("dev"));

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Routes
app.use("/api/v1/auth", authRouter);

app.use("/api/v1/students", authenticateToken, studentRouter);
app.use("/api/v1/branch", authenticateToken, branchRouter);
app.use("/api/v1/misc", miscRouter);

// 404 Handler
app.all("*", (req, res) => {
  res.status(404).json({
    status: "fail",
    message: `Can't find '${req.originalUrl}' on this server`,
  });
});

// Sync Database & Start Server
db.sequelize
  .sync()
  .then(() => {
    console.log("[S] Database synchronized.");

    app.listen(port, () => {
      console.log(`[S] Server running on port ${port}.`);
    });
  })
  .catch((err) => {
    console.error("[E] Database sync failed: \n", err);
  });

module.exports = app;
