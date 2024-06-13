const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  verificationToken: String,
  addresses: {
    name: String,
    mobileNumber: String,
    houseNumber: String,
    street: String,
    landmark: String,
    city: String,
    country: String,
    postalCode: String,
  },
  orders: {
    type: mongoose.Schema.ObjectId,
    ref: "Order",
  },
  createdAt: {
    type: Date,
    default: Date.now, 
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
