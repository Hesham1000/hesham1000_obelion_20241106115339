const Doctor = require('../models/Doctor');

const registerDoctor = async (req, res) => {
    try {
        const { firstName, lastName, email, phone, password, specialty, licenseNumber } = req.body;

        // Create a new doctor record in the database
        const newDoctor = await Doctor.create({
            firstName,
            lastName,
            email,
            phone,
            password,
            specialty,
            licenseNumber
        });

        // Return success response
        res.status(201).json({ message: 'Doctor registered successfully', doctor: newDoctor });
    } catch (error) {
        // Handle validation errors
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({ errors: error.errors.map(e => e.message) });
        }

        // Handle other errors
        res.status(500).json({ error: 'An error occurred while registering the doctor' });
    }
};

const getDoctors = async (req, res) => {
    try {
        // Retrieve all doctors from the database
        const doctors = await Doctor.findAll();

        // Return success response
        res.status(200).json(doctors);
    } catch (error) {
        // Handle errors
        res.status(500).json({ error: 'An error occurred while fetching doctors' });
    }
};

const getDoctorById = async (req, res) => {
    try {
        const { id } = req.params;

        // Retrieve doctor by ID
        const doctor = await Doctor.findByPk(id);

        if (!doctor) {
            return res.status(404).json({ error: 'Doctor not found' });
        }

        // Return success response
        res.status(200).json(doctor);
    } catch (error) {
        // Handle errors
        res.status(500).json({ error: 'An error occurred while fetching the doctor' });
    }
};

const updateDoctor = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, email, phone, password, specialty, licenseNumber } = req.body;

        // Update doctor record
        const [updated] = await Doctor.update(
            { firstName, lastName, email, phone, password, specialty, licenseNumber },
            { where: { id } }
        );

        if (!updated) {
            return res.status(404).json({ error: 'Doctor not found' });
        }

        // Return success response
        res.status(200).json({ message: 'Doctor updated successfully' });
    } catch (error) {
        // Handle validation errors
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({ errors: error.errors.map(e => e.message) });
        }

        // Handle other errors
        res.status(500).json({ error: 'An error occurred while updating the doctor' });
    }
};

const deleteDoctor = async (req, res) => {
    try {
        const { id } = req.params;

        // Delete doctor record
        const deleted = await Doctor.destroy({ where: { id } });

        if (!deleted) {
            return res.status(404).json({ error: 'Doctor not found' });
        }

        // Return success response
        res.status(200).json({ message: 'Doctor deleted successfully' });
    } catch (error) {
        // Handle errors
        res.status(500).json({ error: 'An error occurred while deleting the doctor' });
    }
};

module.exports = {
    registerDoctor,
    getDoctors,
    getDoctorById,
    updateDoctor,
    deleteDoctor
};