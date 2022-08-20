const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Member = require("./models/member");
const app = express();

mongoose
  .connect(
    "mongodb+srv://p00zr:5usscDXsKWhZPDvm@cluster0.ygmir70.mongodb.net/?retryWrites=true&w=majority"
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
    firstName: "Allison",
    lastName: "Hollier",
    emailAddress: "alliegirl710@yahoo.com",
    phoneNumber: "9403666101",
    address: "201 NW Suzanne Terrace",
    city: "Burleson",
    state: "Texas",
    zipCode: "76028",
    callSign: "KG5BHY",
    licenseClass: "Extra",
    membershipType: "Full member",
    title: "Vice President",
    arrlMember: "Yes",
    interests: "Net control",
    memberNotes: "",
  });
  console.log(member);
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
  const members = [
    {
      id: "adf789dasg890ad",
      firstName: "Ken",
      lastName: "Reynolds",
      emailAddress: "kenreynolds78@gmail.com",
      phoneNumber: "2146637086",
      address: "301 Kirby Creek Dr.",
      city: "Grand Prairie",
      state: "TX",
      zipCode: "75052",
      callSign: "KF5WJC",
      licenseClass: "General",
      membershipType: "Full member",
      title: "Treasurer",
      arrlMember: "No",
      interests:
        "Storm chasing, fox hunting, tactical communications, off-grid, repeaters",
      memberNotes: null,
    },
    {
      id: "j353j1kl25312kl",
      firstName: "Jim",
      lastName: "Erickson",
      emailAddress: "kb0dbj@arrl.net",
      phoneNumber: "8177152101",
      address: "5903 Prairie View Ct.",
      city: "Grand Prairie",
      state: "TX",
      zipCode: "75052",
      callSign: "KB0DBJ",
      licenseClass: "Extra",
      membershipType: "Full member",
      title: "President",
      arrlMember: "Yes",
      interests: "Solar, volunteer examiner, elmer",
      memberNotes: null,
    },
  ];
  res.status(200).json({
    message: "Fetched members",
    members: members,
  });
});

module.exports = app;
