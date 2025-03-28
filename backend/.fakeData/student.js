const db = require("../models");
const fs = require("fs");

db.sequelize
  .sync()
  .then(() => {
    console.log("[S] Database synchronized.");
  })
  .catch((err) => {
    console.error("[E] Database sync failed:", err);
  });

const students = JSON.parse(
  fs.readFileSync(`${__dirname}/student.json`, "utf-8")
);

const importBranchData = async () => {
  try {
    const branches = await db.Branch.findAll();

    const branchIds = branches.map((item) => item.id);

    const stds = students.map((item) => ({
      ...item,
      branch_id: branchIds[Math.floor(Math.random() * branchIds.length)],
    }));

    await db.Student.bulkCreate(stds);

    console.log("[S] Created");
  } catch (error) {
    console.error("[E] Error importing:", error);
  }
};

const deleteData = async () => {
  try {
    await db.Student.destroy({
      where: {},
      truncate: true,
    });

    console.log("[S] Deleted all data.");
  } catch (error) {
    console.error("[E] Error deleting:", error);
  }
};

if (process.argv[2] === "--import") {
  importBranchData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
