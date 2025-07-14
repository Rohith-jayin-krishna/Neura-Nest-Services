import React, { useState, useEffect } from 'react';
import './ServiceBooking.css';
import axios from 'axios';

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

  // Sync dropdown from selected tile
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      service_type: selectedService,
    }));
  }, [selectedService]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Sync back to tile highlight if user manually picks from dropdown
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
      console.log('✅ Booking submitted successfully:', response.data);
    } catch (error) {
      console.error('❌ Booking submission failed:', error);
      if (error.response) {
        if (error.response.status === 401 || error.response.status === 403) {
          setError('Authentication failed. Please log in again.');
        } else if (error.response.data && error.response.data.message) {
          const message = error.response.data.message;
          setError(`Submission failed: ${Array.isArray(message) ? message.join(', ') : message}`);
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

          <input
            name="preferred_date"
            type="date"
            onChange={handleChange}
            value={formData.preferred_date}
            required
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