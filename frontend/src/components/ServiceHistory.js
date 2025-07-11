import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ServiceHistory = () => {
  const [history, setHistory] = useState([]);
  const [error, setError] = useState('');

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem('access_token');
      console.log("🔐 Access Token:", token); // ✅ Log the token

    // Check if token is missing
      if (!token) {
        setError("⚠️ You must be logged in to view your service history.");
        return;
      }

      const response = await axios.get('http://localhost:8000/api/service-history/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("📦 Service History Response:", response.data); // ✅ Log response

      setHistory(response.data);
    } catch (err) {
      console.error('❌ Error fetching service history:', err);
      setError('Could not load service history. Please try again.');
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="service-history" style={{ padding: '2rem', color: '#f4f4f4' }}>
      <h2>Your Service History</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {history.length === 0 && !error ? (
        <p>No service records found.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
          <thead>
            <tr>
              <th style={tableHeaderStyle}>Ticket ID</th>
              <th style={tableHeaderStyle}>Service Type</th>
              <th style={tableHeaderStyle}>Preferred Date</th>
              <th style={tableHeaderStyle}>Status</th>
            </tr>
          </thead>
          <tbody>
            {history.map((booking) => (
              <tr key={booking.id} style={tableRowStyle}>
                <td style={tableCellStyle}>{booking.ticket_id}</td>
                <td style={tableCellStyle}>{booking.service_type}</td>
                <td style={tableCellStyle}>{booking.preferred_date}</td>
                <td style={tableCellStyle}>{booking.status || 'Active'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

// Basic styles
const tableHeaderStyle = {
  borderBottom: '2px solid #F09304',
  padding: '10px',
  textAlign: 'left',
  color: '#F09304',
  fontWeight: 'bold',
};

const tableCellStyle = {
  padding: '10px',
  borderBottom: '1px solid #444',
};

const tableRowStyle = {
  backgroundColor: '#1f1f1f',
};

export default ServiceHistory;