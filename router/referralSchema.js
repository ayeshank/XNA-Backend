const mongoose = require("mongoose");

const referralSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  memberno: {
    type: String,
    required: true,
  },
  rlvl1: {
    type: String,
    required: true,
  },
  rlvl2: {
    type: String,
    required: false,
  },
  rlvl3: {
    type: String,
    required: false,
  },
  rlvl4: {
    type: String,
    required: false,
  },
  rlvl5: {
    type: String,
    required: false,
  },
  rlvl6: {
    type: String,
    required: false,
  },
  rlvl7: {
    type: String,
    required: false,
  },
  rlvl8: {
    type: String,
    required: false,
  },
  rlvl9: {
    type: String,
    required: false,
  },
  rlvl10: {
    type: String,
    required: false,
  },
  rlvl11: {
    type: String,
    required: false,
  },
  rlvl12: {
    type: String,
    required: false,
  },
});

const referral = new mongoose.model("referral", referralSchema);
module.exports = referral;
