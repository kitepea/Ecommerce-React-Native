require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
const port = 8000;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.arllh67.mongodb.net`
  )
  .then(() => {
    console.log("Connect to MongoDb");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDb ", err);
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
