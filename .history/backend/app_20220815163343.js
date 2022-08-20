const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const membersRoutes = require("./routes/members");

const app = express();

mongoose
  .connect(
    "mongodb+srv://p00zr:5usscDXsKWhZPDvm@cluster0.ygmir70.mongodb.net/members?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to database...");
  })
  .catch(() => {
    console.error("Database connection failed!");
  });

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, DELETE, OPTIONS, PATCH, POST, PUT"
  );
  next();
});

app.use("/api/members", membersRoutes);

module.exports = app;
