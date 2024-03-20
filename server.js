require("dotenv").config();

const mongoose = require("mongoose");

const express = require("express");

const app = express();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("DB Connected!"))
  .catch((error) => console.log("DB Failed to Connect", error));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/health", (req, res) => {
  console.log("hey health");
  res.json({
    service: "Backend Joblisting server",
    status: "active",
    time: new Date(),
  });
});

app.post("/api/v1/hi", (req, res) => {
  res.json({
    message: "hi",
  });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});