const express = require("express");
const router = express.Router();
const {
  getStudentData,
  getStudentByName,
  deleteStudent,
} = require("../Controller/student");
const { Registration, Login } = require("../Controller/teacher");

router.get("/all/:email", getStudentData);
router.get("/search", getStudentByName);
router.delete("/", deleteStudent);
router.post("/register", Registration);
router.post("/login", Login);

module.exports = router;
