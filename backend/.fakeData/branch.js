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

const branches = JSON.parse(
  fs.readFileSync(`${__dirname}/branch.json`, "utf-8")
);

const importBranchData = async () => {
  try {
    await db.Branch.bulkCreate(branches);

    console.log("[S] Created");
  } catch (error) {
    console.error("[E] Error importing:", error);
  }
};

const deleteData = async () => {
  try {
    await db.Branch.destroy({
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
