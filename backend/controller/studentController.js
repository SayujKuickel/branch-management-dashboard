const db = require("../models");

exports.getAllStudents = async (req, res) => {
  try {
    const whereClause = {};

    if (req.query.branch_id) {
      whereClause.branch_id = req.query.branch_id;
    }

    // handle unasigned students
    if (req.query.unasigned === "true") {
      whereClause.branch_id = null;
    }

    const limit = parseInt(req.query.limit, 10) || 5;
    const page = parseInt(req.query.page, 10) || 0;
    const skip = page * limit;

    const data = await db.Student.findAll({
      where: whereClause,
      limit: limit,
      offset: skip,
    });

    const total = await db.Student.count({ where: whereClause });
    const maxPages = Math.ceil(total / limit);

    const students = await Promise.all(
      data.map(async (item) => {
        const student = item.toJSON();
        const branch = await db.Branch.findByPk(student.branch_id);

        return { ...student, branch };
      })
    );

    res.status(200).json({
      status: "success",
      showing: students.length,
      maxPages,
      page,
      data: students,
    });
  } catch (error) {
    console.error("Error fetching students:", error);

    res.status(500).json({
      status: "error",
      message: "Failed to retrieve students",
    });
  }
};

exports.createStudent = async (req, res) => {
  try {
    const studentData = req.body;

    if (!studentData.branch_id) {
      studentData.branch_id = null;
    }

    const student = await db.Student.create(studentData);

    res.status(200).json({
      status: "success",
      data: student,
    });
  } catch (error) {
    console.log("[E]", error.message);

    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

//
exports.getStudent = async (req, res) => {
  try {
    const id = req.params.id;

    const data = await db.Student.findOne({ where: { id: id } });

    if (!data) {
      return res.status(200).json({
        status: "success",
        student: null,
      });
    }

    const branch = await db.Branch.findByPk(data.branch_id);

    const student = { ...data.toJSON(), branch };

    res.status(200).json({
      status: "success",
      student: student,
    });

    if (!id) throw new Error("No ID found");
  } catch (error) {
    console.log("[E]", error.message);

    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const student = await db.Student.findByPk(req.params.id);

    if (!student) throw new Error(`No Student with id ${req.params.id} found`);

    const studentData = req.body;

    if (!studentData.branch_id) {
      studentData.branch_id = null;
    }

    await student.update(studentData);

    res.status(200).json({ status: "success", data: student });
  } catch (error) {
    console.log("[E]", error.message);

    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const student = await db.Student.findByPk(req.params.id);

    if (!student) throw new Error(`No Student with id ${req.params.id} found`);

    await student.destroy();

    res.status(200).json({ status: "success", data: null });
  } catch (error) {
    console.log("[E]", error.message);

    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
