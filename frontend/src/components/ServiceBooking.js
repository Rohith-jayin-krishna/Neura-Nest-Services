import React, { useState, useEffect, useRef } from 'react';
import './ServiceBooking.css';
import axios from 'axios';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/themes/material_blue.css';
import { format, isValid } from 'date-fns';

const ServiceBooking = ({ selectedService = '', setSelectedService }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service_type: selectedService,
    preferred_date: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');
  const [error, setError] = useState('');
  const dateInputRef = useRef(null);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      service_type: selectedService,
    }));
  }, [selectedService]);

  useEffect(() => {
    // Initialize flatpickr on input ref
    if (dateInputRef.current) {
      flatpickr(dateInputRef.current, {
        dateFormat: 'Y-m-d',
        minDate: 'today',
        onChange: (selectedDates) => {
          const date = selectedDates[0];
          if (date && isValid(date)) {
            setFormData((prev) => ({
              ...prev,
              preferred_date: format(date, 'yyyy-MM-dd'),
            }));
          }
        },
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'service_type' && setSelectedService) {
      setSelectedService(value);
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setTicketId('');

    const token = localStorage.getItem('access_token');
    if (!token) {
      setError('⚠️ You must be logged in to book a service.');
      return;
    }

    const parsed = new Date(formData.preferred_date);
    if (!isValid(parsed) || parsed < new Date().setHours(0, 0, 0, 0)) {
      setError('Please select a valid future date.');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:8000/api/bookings/',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setSubmitted(true);
      setTicketId(response.data.ticket_id);
    } catch (error) {
      console.error('❌ Booking submission failed:', error);
      if (error.response) {
        if (error.response.status === 401 || error.response.status === 403) {
          setError('Authentication failed. Please log in again.');
        } else if (error.response.data?.message) {
          const msg = error.response.data.message;
          setError(`Submission failed: ${Array.isArray(msg) ? msg.join(', ') : msg}`);
        } else {
          setError('Booking submission failed. Please try again.');
        }
      } else if (error.request) {
        setError('No response from server. Please check your internet connection.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="book-service-form">
      <h2>Book a Smart Home Service</h2>
      {submitted ? (
        <div className="success-message">
          <p>✅ Thank you! Your service ticket has been created.</p>
          <p><strong>Ticket ID:</strong> {ticketId}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Name"
            onChange={handleChange}
            value={formData.name}
            required
          />
          <input
            name="phone"
            placeholder="Phone"
            onChange={handleChange}
            value={formData.phone}
            required
          />

          <select
            name="service_type"
            value={formData.service_type}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select Service Type</option>
            <option value="Basic Package">Basic Package</option>
            <option value="Plus Package">Plus Package</option>
            <option value="Full Automation">Full Automation</option>
          </select>

          {/* ✅ Native Flatpickr on plain input */}
          <input
            ref={dateInputRef}
            className="date-picker-input"
            placeholder="Preferred Date (YYYY-MM-DD)"
            required
            readOnly
          />

          <textarea
            name="message"
            placeholder="Additional Message (Optional)"
            onChange={handleChange}
            value={formData.message}
          />
          <button type="submit">Submit</button>
          {error && (
            <p className="error-message" style={{ color: '#F44336', marginTop: '15px' }}>
              {error}
            </p>
          )}
        </form>
      )}
    </div>
  );
};

export default ServiceBooking;