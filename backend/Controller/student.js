const studentData = require("../Models/studentModal");

const getStudentData = async (req, res) => {
  console.log(req.query)
  // let x = await studentData.find().then((data) => data)
  // console.log(x)
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const filter = (req.query.gender && { gender: req.query.gender }) || {};
  const sort =
    (req.query.age !== undefined && { studentAge: req.query.age }) || {};
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const results = {};
  results.totalCount = await studentData
    .find({ Owner: req.params.email, ...filter })
    .sort(sort)
    .countDocuments()
    .exec();
  if (
    endIndex <
    (await studentData.find({ Owner: req.params.email }).countDocuments().exec())
  ) {
    results.next = {
      page: page + 1,
      limit: limit,
    };
  }
  if (startIndex > 0) {
    results.prev = {
      page: page - 1,
      limit: limit,
    };
  }
  studentData
    .find({ Owner: req.params.email, ...filter})
    .sort(sort)
    .limit(limit)
    .skip(startIndex)
    .then((item) => {
      console.log(item)
      res.status(200).json({ item: item, totalCount: results.totalCount })
    })
    .catch((err) =>
      res.status(400).json({ message: "Failed to extract the Information" })
    );
};

const getStudentByName = (req, res) => {
  studentData
    .findOne({ Owner: req.query.email, studentName: req.query.name })
    .then((item) => res.status(200).json(item))
    .catch((err) =>
      res.status(400).json({ message: "Failed to extract the Information" })
    );
};

const deleteStudent = async (req, res) => {
  studentData
    .findOneAndDelete({ registrationNo: req.query.id })
    .then((res) => res.json({ message: "Success" }));
};

module.exports = {
  getStudentData,
  getStudentByName,
  deleteStudent,
};
