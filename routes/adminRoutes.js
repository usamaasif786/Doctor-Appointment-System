const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  getAllUsersController,
  getAllDoctorsController,
  changeAccountStatusController,
} = require("../controllers/adminCtrl");

const router = express.Router();

// GET Method || Users
router.get("/getAllUsers", authMiddleware, getAllUsersController);

// GET Method || Doctors
router.get("/getAllDoctors", authMiddleware, getAllDoctorsController);

// POST Method ||Accoun Status
router.post(
  "/changeAccountStatus",
  authMiddleware,
  changeAccountStatusController
);

module.exports = router;
