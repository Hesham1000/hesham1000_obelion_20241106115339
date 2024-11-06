const express = require('express');
const router = express.Router();
const { searchDoctors, bookAppointment, getAvailableAppointments } = require('../controllers/patientController');

// Sequelize configuration
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('healthcare_2App', 'root', 'root', {
  host: 'db',
  dialect: 'mysql',
  port: 3306,
});

// Test database connection
sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err));

// API Endpoints
router.get('/doctors/search', searchDoctors);
router.post('/appointments/book', bookAppointment);
router.get('/appointments/available', getAvailableAppointments);

module.exports = router;
