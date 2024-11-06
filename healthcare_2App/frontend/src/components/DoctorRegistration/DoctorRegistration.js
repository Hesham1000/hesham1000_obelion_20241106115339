import React, { useState } from 'react';
import axios from 'axios';
import './DoctorRegistration.css';

function DoctorRegistration() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    specialty: '',
    licenseNumber: ''
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    tempErrors.firstName = formData.firstName ? "" : "First Name is required.";
    tempErrors.lastName = formData.lastName ? "" : "Last Name is required.";
    tempErrors.email = /\S+@\S+\.\S+/.test(formData.email) ? "" : "Email is not valid.";
    tempErrors.phone = formData.phone.length > 9 ? "" : "Phone number is not valid.";
    tempErrors.password = formData.password.length > 5 ? "" : "Password must be at least 6 characters.";
    tempErrors.specialty = formData.specialty ? "" : "Specialty is required.";
    tempErrors.licenseNumber = formData.licenseNumber ? "" : "License Number is required.";
    setErrors(tempErrors);

    return Object.values(tempErrors).every(x => x === "");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await axios.post('https://healthcare-2app-backend.cloud-stacks.com/api/doctors', formData, {
          headers: { 'Content-Type': 'application/json' }
        });
        console.log('Doctor registered successfully:', response.data);
      } catch (error) {
        if (error.response && error.response.data.errors) {
          setErrors({ apiError: error.response.data.errors.join(', ') });
        } else {
          setErrors({ apiError: 'An error occurred while registering the doctor.' });
        }
      }
    }
  };

  return (
    <div className="doctor-registration">
      <h1>Doctor Registration</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
          />
          {errors.firstName && <span>{errors.firstName}</span>}
        </div>
        <div className="form-group">
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
          />
          {errors.lastName && <span>{errors.lastName}</span>}
        </div>
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span>{errors.email}</span>}
        </div>
        <div className="form-group">
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && <span>{errors.phone}</span>}
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <span>{errors.password}</span>}
        </div>
        <div className="form-group">
          <input
            type="text"
            name="specialty"
            placeholder="Specialty"
            value={formData.specialty}
            onChange={handleChange}
          />
          {errors.specialty && <span>{errors.specialty}</span>}
        </div>
        <div className="form-group">
          <input
            type="text"
            name="licenseNumber"
            placeholder="License Number"
            value={formData.licenseNumber}
            onChange={handleChange}
          />
          {errors.licenseNumber && <span>{errors.licenseNumber}</span>}
        </div>
        {errors.apiError && <span>{errors.apiError}</span>}
        <button type="submit">Register</button>
      </form>
      <div className="additional-links">
        <a href="#">Terms and Conditions</a>
        <a href="#">Privacy Policy</a>
        <a href="#">Help</a>
      </div>
      <footer>
        <div className="footer-links">
          <a href="#">About Us</a>
          <a href="#">Contact Us</a>
          <a href="#">Help</a>
        </div>
        <p>&copy; 2023 Healthcare Inc.</p>
      </footer>
    </div>
  );
}

export default DoctorRegistration;
