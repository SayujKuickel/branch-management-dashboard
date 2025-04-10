// const db = require("../models");
// const sequelize = require("sequelize");

// exports.getStats = async (req, res) => {
//   try {
//     const branches = await db.Branch.count();
//     const students = await db.Student.count();

//     const top_5_branches = await db.Student.findAll({
//       attributes: [
//         "branch_id",
//         [sequelize.fn("COUNT", sequelize.col("Student.id")), "student_count"],
//         [sequelize.col("branch.name"), "branch_name"],
//         [sequelize.col("branch.location"), "branch_location"],
//       ],
//       include: [
//         {
//           model: db.Branch,
//           attributes: [],
//         },
//       ],
//       group: ["branch_id"],
//       limit: 5,
//       where: {
//         branch_id: { [sequelize.Op.ne]: null },
//       },
//     });

//     const unassigned = await db.Student.count({ where: { branch_id: null } });

//     const stats = {
//       total_branches: branches,
//       total_students: students,
//       unassigned,
//       branch_data: top_5_branches,
//     };

//     res.status(200).json({
//       status: "success",
//       stats,
//     });
//   } catch (error) {
//     console.error("Error fetching stats:", error);

//     res.status(500).json({
//       status: "error",
//       message: "Failed to retrieve statistics",
//     });
//   }
// };

const db = require("../models");
const sequelize = require("sequelize");

exports.getStats = async (req, res) => {
  try {
    const branches = await db.Branch.count();
    const students = await db.Student.count();

    const top_5_branches = await db.Student.findAll({
      attributes: [
        "branch_id",
        [sequelize.fn("COUNT", sequelize.col("Student.id")), "student_count"],
        [sequelize.col("branch.name"), "branch_name"],
        [sequelize.col("branch.location"), "branch_location"],
      ],
      include: [
        {
          model: db.Branch,
          attributes: [],
        },
      ],
      where: {
        branch_id: { [sequelize.Op.ne]: null },
      },
      group: ["branch_id"],
      order: [[sequelize.literal("student_count"), "ASC"]], // sort ascending by count
      limit: 5,
    });

    const unassigned = await db.Student.count({ where: { branch_id: null } });

    const stats = {
      total_branches: branches,
      total_students: students,
      unassigned,
      branch_data: top_5_branches,
    };

    res.status(200).json({
      status: "success",
      stats,
    });
  } catch (error) {
    console.error("Error fetching stats:", error);

    res.status(500).json({
      status: "error",
      message: "Failed to retrieve statistics",
    });
  }
};
