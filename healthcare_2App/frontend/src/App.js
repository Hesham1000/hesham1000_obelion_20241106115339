import React from 'react';
import PatientRegistration from './components/PatientRegistration/PatientRegistration.js';
import DoctorRegistration from './components/DoctorRegistration/DoctorRegistration.js';
import AppointmentBooking from './components/AppointmentBooking/AppointmentBooking.js';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to the Health Care System</h1>
      </header>
      <main>
        <PatientRegistration />
        <DoctorRegistration />
        <AppointmentBooking />
      </main>
    </div>
  );
};

export default App;
