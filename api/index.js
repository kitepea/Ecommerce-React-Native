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

const User = require("./models/user");
const Order = require("./models/order");

// register
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check if registered
    const existedUser = await User.findOne({ email });
    if (existedUser) {
      return res.status(400).json({ message: "Existed user" });
    }

    // create new user
    const newUser = new User({ name, email, password });

    // generate and store the verification token
    newUser.verificationToken = crypto.randomBytes(20).toString("hex");

    // save user to MongoDb
    await newUser.save();

    // send verification email to user
    sendVerificationEmail(newUser.email, newUser.verificationToken);

    res.status(201).json({
      message:
        "Registration successful. Please check your email for verification.",
    });
  } catch (error) {
    console.log("Error registering user: ", error);
    res.status(500).json({ message: "Registration failed" });
  }
});

// send verification email function
const sendVerificationEmail = async (email, token) => {
  // nodemailer transport

  const transporter = nodemailer.createTransport({
    // email service
    service: "gmail",
    auth: {
      user: "bruceparkerblue@gmail.com",
      pass: "oaqq uvxc fkxh myar",
    },
  });
  // email option
  const mailOption = {
    from: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    to: email,
    subject: "Email verification (Test)",
    text: `Please click the link in order to verify your account: http://localhost:8000/verify/${token}`,
  };

  // send email
  try {
    await transporter.sendMail(mailOption);
    console.log("Verification email sent successfully");
  } catch (error) {
    console.error("Error sending verification email: ", error);
  }
};

// verify
app.get("/verify/:token", async (req, res) => {
  try {
    const token = req.params.token;

    //Find the user witht the given verification token
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.status(404).json({ message: "Invalid verification token" });
    }

    //Mark the user as verified
    user.verified = true;

    // remove token to make sure it won't be used again
    user.verificationToken = undefined;

    await user.save();

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({ message: "Email Verificatioion Failed" });
  }
});
