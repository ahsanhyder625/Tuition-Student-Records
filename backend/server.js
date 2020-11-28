const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();
const studentdata = require("./Models/studentModal");
const studentList = require("./data");
const teacherdata = require("./Models/teacherModal")
const teacherList = require("./teacher")
const router = require("./Routes/routes");

dotenv.config();

app.use(cors());
app.use(express.json());

mongoose.connect(
  process.env.ATLAS_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Connection Successfull!");
        studentdata.find()
        .then((data) => {
          if (data.length === 0) {
            studentdata.insertMany(studentList)
              .then(() =>
                console.log("Initial Data of manager is Added to the database")
              )
              .catch((err) => console.log("Error: " + err));
          } else {
            console.log("initial data is allready present");
          }
        })
        .catch((err) => console.log("Error: " + err));


        teacherdata.find()
        .then((data) => {
          if (data.length === 0) {
            teacherdata.insertMany(teacherList)
              .then(() =>
                console.log("Initial Data of Teacher is Added to the database")
              )
              .catch((err) => console.log("Error: " + err));
          } else {
            console.log("initial data is allretady present");
          }
        })
        .catch((err) => console.log("Error: " + err));

    }
  }
);

app.use("/", router);

app.listen(9000, () => {
  console.log("The Server is up and Running!");
});
