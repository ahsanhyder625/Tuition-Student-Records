const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentData = new Schema(
  {
    studentId: {
      type: String,
      trim: true,
      required: true,
    },
    studentImage: {
      type: String,
      required: true,
      trim: true,
    },
    studentName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    registrationNo: {
      type: String,
      required: true,
      trim: true,
    },
    gender: {
      type: String,
      required: true,
    },
    studentAge: {
      type: Number,
      required: true,
    },
    tests: {
      type: Array,
      required: true,
    },
    Owner: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("StudentData", studentData);
