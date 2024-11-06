const { Patient, Doctor, Appointment } = require('[]');

const searchDoctors = async (req, res) => {
  const { location, specialty } = req.query;

  try {
    const doctors = await Doctor.findAll({
      where: {
        location: location,
        specialty: specialty
      }
    });
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ error: 'Failed to search doctors' });
  }
};

const bookAppointment = async (req, res) => {
  const { patientId, doctorId, appointmentTime } = req.body;

  try {
    const appointment = await Appointment.create({
      patientId: patientId,
      doctorId: doctorId,
      appointmentTime: appointmentTime
    });
    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to book appointment' });
  }
};

const getAvailableAppointments = async (req, res) => {
  const { doctorId, date } = req.query;

  try {
    const appointments = await Appointment.findAll({
      where: {
        doctorId: doctorId,
        date: date
      }
    });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve available appointments' });
  }
};

module.exports = {
  searchDoctors,
  bookAppointment,
  getAvailableAppointments
};
