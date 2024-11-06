const express = require('express');
const router = express.Router();
const {
  registerDoctor,
  getDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor
} = require('../controllers/doctorController');

// POST /doctors - Register a new doctor
router.post('/doctors', registerDoctor);

// GET /doctors - Get all doctors
router.get('/doctors', getDoctors);

// GET /doctors/:id - Get a doctor by ID
router.get('/doctors/:id', getDoctorById);

// PUT /doctors/:id - Update a doctor by ID
router.put('/doctors/:id', updateDoctor);

// DELETE /doctors/:id - Delete a doctor by ID
router.delete('/doctors/:id', deleteDoctor);

module.exports = router;

// models/doctor.js

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'db', // Replaced 'localhost' with 'db'
  dialect: 'mysql'
});

const Doctor = sequelize.define('Doctor', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  specialty: {
    type: DataTypes.STRING,
    allowNull: false
  },
  licenseNumber: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'doctors'
});

module.exports = Doctor;