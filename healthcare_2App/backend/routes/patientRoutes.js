const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');

// POST /patients - Register a new patient
router.post('/patients', patientController.registerPatient);

// GET /patients - Retrieve all patients
router.get('/patients', patientController.getPatients);

// GET /patients/:id - Retrieve a specific patient by ID
router.get('/patients/:id', patientController.getPatientById);

// PUT /patients/:id - Update a specific patient by ID
router.put('/patients/:id', patientController.updatePatient);

// DELETE /patients/:id - Delete a specific patient by ID
router.delete('/patients/:id', patientController.deletePatient);

module.exports = router;
sql
CREATE TABLE patients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('patients', []),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('patients', null, {})
};