const db = require("../models");

exports.getAllBranches = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 5;
    const page = parseInt(req.query.page, 10) || 0;
    const skip = page * limit;

    const branches = await db.Branch.findAll({
      limit: limit,
      offset: skip,
    });

    const totalBranch = await db.Branch.count();

    res.status(200).json({
      status: "success",
      showing: branches.length,
      page: page,
      data: branches,
    });
  } catch (error) {
    console.error("Error fetching branches:", error);

    res.status(500).json({
      status: "error",
      message: "Failed to retrieve branches",
    });
  }
};

exports.createBranch = async (req, res) => {
  try {
    const branch = await db.Branch.create(req.body);

    res.status(200).json({
      status: "success",
      data: branch,
    });
  } catch (error) {
    console.log("[E] Error create branch");

    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

//
exports.getBranch = async (req, res) => {
  try {
    const id = req.params.id;

    const branch = await db.Branch.findOne({ where: { id: id } });

    res.status(200).json({
      status: "success",
      branch: branch,
    });

    if (!id) throw new Error("No ID found");
  } catch (error) {
    console.log("[E] Error get branch");

    res.status(500).json({
      status: "error",
      message: "There was an error while fetching branch",
    });
  }
};

exports.updateBranch = async (req, res) => {
  try {
    const branch = await db.Branch.findByPk(req.params.id);

    if (!branch) throw new Error(`No branch with id ${req.params.id} found`);

    await branch.update(req.body);

    res.status(200).json({ status: "success", data: branch });
  } catch (error) {
    console.log("[E] Error update branch");

    res.status(500).json({
      status: "error",
      message: "There was an error while updating branch",
    });
  }
};

exports.deleteBranch = async (req, res) => {
  try {
    const branch = await db.Branch.findByPk(req.params.id);

    if (!branch) throw new Error(`No branch with id ${req.params.id} found`);

    await branch.destroy();

    res.status(200).json({ status: "success", data: null });
  } catch (error) {
    console.log("[E] Error delete branch");

    res.status(500).json({
      status: "error",
      message: "Error while Deleting a branch",
    });
  }
};

//
//
exports.getBranchOptions = async (req, res) => {
  try {
    const branches = await db.Branch.findAll();

    const options = branches.map((item) => ({ id: item.id, name: item.name }));

    res.status(200).json({
      status: "success",
      data: options,
    });
  } catch (error) {
    console.error("Error fetching branches:", error);

    res.status(500).json({
      status: "error",
      message: "Failed to retrieve branches",
    });
  }
};
