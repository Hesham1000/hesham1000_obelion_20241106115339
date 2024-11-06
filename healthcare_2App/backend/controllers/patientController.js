const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'db',
  dialect: 'mysql'
});

const Patient = sequelize.define('Patient', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'patients',
  timestamps: false
});

exports.registerPatient = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newPatient = await Patient.create({ name, email, password });
    res.status(201).json({ message: 'Patient registered successfully', patient: newPatient });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(400).json({ error: 'Email already exists' });
    } else {
      res.status(500).json({ error: 'An error occurred while registering the patient' });
    }
  }
};

exports.getPatients = async (req, res) => {
  try {
    const patients = await Patient.findAll();
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching patients' });
  }
};

exports.getPatientById = async (req, res) => {
  try {
    const { id } = req.params;
    const patient = await Patient.findByPk(id);
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the patient' });
  }
};

exports.updatePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    const patient = await Patient.findByPk(id);
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    await patient.update({ name, email });
    res.status(200).json({ message: 'Patient updated successfully', patient });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the patient' });
  }
};

exports.deletePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const patient = await Patient.findByPk(id);
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    await patient.destroy();
    res.status(200).json({ message: 'Patient deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the patient' });
  }
};