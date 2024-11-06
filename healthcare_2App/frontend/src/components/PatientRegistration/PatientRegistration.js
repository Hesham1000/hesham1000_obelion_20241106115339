import React, { useState } from 'react';
import axios from 'axios';
import './PatientRegistration.css';

function PatientRegistration() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://healthcare-2app-backend.cloud-stacks.com/api/patients', formData, {
        headers: { 'Content-Type': 'application/json' },
      });
      console.log('Patient registered successfully', response.data);
      // Redirect to dashboard or another page on success
    } catch (error) {
      if (error.response && error.response.data) {
        console.error('Error:', error.response.data.error);
      } else {
        console.error('An unexpected error occurred');
      }
    }
  };

  return (
    <div className="patient-registration">
      <header className="header">
        <div className="branding">Healthcare System</div>
        <nav className="navigation">
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </header>

      <main className="main-content">
        <form className="registration-form" onSubmit={handleSubmit}>
          <h1>Patient Registration</h1>
          <div className="form-field">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-field">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>
          <button type="submit" className="register-button">Register</button>
        </form>
        <div className="additional-links">
          <a href="#forgot-password">Forgot password?</a>
          <a href="#help">Help</a>
          <a href="#contact-us">Contact Us</a>
        </div>
      </main>

      <footer className="footer">
        <ul>
          <li><a href="#terms">Terms and Conditions</a></li>
          <li><a href="#privacy">Privacy Policy</a></li>
          <li><a href="#about-us">About Us</a></li>
        </ul>
      </footer>
    </div>
  );
}

export default PatientRegistration;
