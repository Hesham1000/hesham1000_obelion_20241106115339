import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AppointmentBooking.css';

function AppointmentBooking() {
  const [location, setLocation] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [appointmentTime, setAppointmentTime] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get('https://healthcare-2app-backend.cloud-stacks.com/api/doctors/search', {
        params: {
          location,
          specialty
        }
      });
      setDoctors(response.data);
    } catch (error) {
      alert('Failed to search doctors');
    }
  };

  const fetchAvailableSlots = async (doctorId) => {
    try {
      const response = await axios.get('https://healthcare-2app-backend.cloud-stacks.com/api/appointments/available', {
        params: {
          doctorId,
          date: new Date().toISOString().slice(0, 10)
        }
      });
      setAvailableSlots(response.data);
    } catch (error) {
      alert('Failed to retrieve available appointments');
    }
  };

  const handleBookAppointment = async () => {
    try {
      const response = await axios.post('https://healthcare-2app-backend.cloud-stacks.com/api/appointments/book', {
        patientId: 1, // Replace with actual patient ID
        doctorId: selectedDoctor.id,
        appointmentTime
      });
      alert('Appointment booked successfully');
    } catch (error) {
      alert('Failed to book appointment');
    }
  };

  useEffect(() => {
    if (selectedDoctor) {
      fetchAvailableSlots(selectedDoctor.id);
    }
  }, [selectedDoctor]);

  return (
    <div className="appointment-booking">
      <header>
        <div className="branding">
          <h1>Appointment Booking Process</h1>
        </div>
        <nav className="navigation-tabs">
          <a href="/home">Home</a>
          <a href="/find-doctors">Find Doctors</a>
          <a href="/book-appointment">Book Appointment</a>
          <a href="/contact-us">Contact Us</a>
        </nav>
      </header>
      <main>
        <div className="search-form">
          <input
            type="text"
            placeholder="Enter location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter specialty"
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        <div className="available-slots">
          {doctors.map((doctor) => (
            <div key={doctor.id} onClick={() => setSelectedDoctor(doctor)}>
              <h3>{doctor.name}</h3>
              <p>{doctor.specialty}</p>
            </div>
          ))}
          {selectedDoctor && (
            <div>
              <h2>Available Slots for Dr. {selectedDoctor.name}</h2>
              {availableSlots.map((slot, index) => (
                <div key={index}>
                  <button onClick={() => setAppointmentTime(slot.appointmentTime)}>
                    {slot.appointmentTime}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        <button className="book-now" onClick={handleBookAppointment}>Book Now</button>
      </main>
      <footer>
        <div className="footer-links">
          <a href="/help">Help</a>
          <a href="/feedback">Feedback</a>
          <a href="/terms">Terms & Conditions</a>
        </div>
        <div className="social-media">
          {/* Social media links */}
        </div>
      </footer>
    </div>
  );
}

export default AppointmentBooking;
