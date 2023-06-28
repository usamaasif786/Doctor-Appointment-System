const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  getDoctorInfoController,
  updateProfileController,
  getDoctorByIdController,
  doctorAppointmentsController,
  updateStatusController,
} = require("../controllers/doctorCtrl");
const router = express.Router();

// Post single doctor information
router.post("/getDoctorInfo", authMiddleware, getDoctorInfoController);

// Post Update Profile
router.post("/updateProfile", authMiddleware, updateProfileController);

// Post Get single doctor data
router.post("/getDoctorById", authMiddleware, getDoctorByIdController);

// Get || Get Appointments
router.get(
  "/doctor-appointments",
  authMiddleware,
  doctorAppointmentsController
);

// Post || Update Status (Appointment Approval)
router.post("/update-status", authMiddleware, updateStatusController);

module.exports = router;
