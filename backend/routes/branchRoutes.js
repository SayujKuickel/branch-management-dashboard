const express = require("express");

const router = express.Router();

const branchController = require("../controller/branchController");

router
  .route("/")
  .get(branchController.getAllBranches)
  .post(branchController.createBranch);

router.route("/options").get(branchController.getBranchOptions);

router
  .route("/:id")
  .get(branchController.getBranch)
  .patch(branchController.updateBranch)
  .delete(branchController.deleteBranch);

module.exports = router;
