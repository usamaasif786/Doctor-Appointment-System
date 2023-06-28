const appointmentModel = require("../models/appointmentModel");
const doctorModel = require("../models/doctorModel");
const userModel = require("../models/userModels");

// Doctor Profile Infromation Controller
const getDoctorInfoController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ userId: req.body.userId });

    res.status(200).send({
      success: true,
      message: "Doctor Data Fetch Successfully",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error While Fetching Doctor Information",
      success: false,
      error,
    });
  }
};

// Doctor Profile Update Controller
const updateProfileController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOneAndUpdate(
      {
        userId: req.body.userId,
      },
      req.body
    );
    res.status(201).send({
      success: true,
      message: "Doctor Data Update Successfully",
      data: doctor,
    });
  } catch (error) {
    console.log(object);
    res.status(500).send({
      message: "Error While Updating Doctor Information",
      success: false,
      error,
    });
  }
};

// Get single Doctor Controller
const getDoctorByIdController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ _id: req.body.doctorId });
    res.status(200).send({
      success: true,
      message: "Single Data Fetch Successfully",
      data: doctor,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error While Fetching Single Doctor Appointment",
      success: false,
      error,
    });
  }
};

// Get Doctor Appointments Controller
const doctorAppointmentsController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ userId: req.body.userId });
    const appointments = await appointmentModel.find({
      doctorId: doctor._id,
    });
    res.status(200).send({
      success: true,
      message: "Doctors Appointment Fetch Successfully",
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error While Fetching Doctor Appointment",
      success: false,
      error,
    });
  }
};

// Post Update Status Controller
const updateStatusController = async (req, res) => {
  try {
    const { appointmentsId, status } = req.body;
    const appointments = await appointmentModel.findByIdAndUpdate(
      appointmentsId,
      { status }
    );
    const user = await userModel.findOne({ _id: appointments.userId });
    user.notification.push({
      type: "status-updated",
      message: `Your appointment has been updated (${status})`,
      onClickPath: "/doctor-appointments",
    });
    await user.save();
    res.status(200).send({
      success: true,
      message: "Appointment Status Updated",
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error While Appointment Status Update",
      success: false,
      error,
    });
  }
};

module.exports = {
  getDoctorInfoController,
  updateProfileController,
  getDoctorByIdController,
  doctorAppointmentsController,
  updateStatusController,
};
