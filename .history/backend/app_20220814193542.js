const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Member = require("./models/member");
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

app.post("/api/members", (req, res, next) => {
  const member = new Member({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    emailAddress: req.body.emailAddress,
    phoneNumber: req.body.phoneNumber,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    zipCode: req.body.zipCode,
    callSign: req.body.callSign,
    licenseClass: req.body.licenseClass,
    membershipType: req.body.membershipType,
    title: req.body.title,
    arrlMember: req.body.arrlMember,
    interests: req.body.interests,
    memberNotes: req.body.memberNotes,
  });
  member.save();
  res.status(201).json({
    message: "Member added successfully",
  });
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/members", (req, res, next) => {
  Member.find().then((documents) => {
    console.log(documents);
  });
  res.status(200).json({
    message: "Fetched members",
    members: members,
  });
});

module.exports = app;
