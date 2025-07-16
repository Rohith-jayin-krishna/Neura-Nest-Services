import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ServiceHistory.css'; // External styles

const ServiceHistory = () => {
  const [history, setHistory] = useState([]);
  const [error, setError] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        setError('⚠️ You must be logged in to view your service history.');
        return;
      }

      const response = await axios.get('http://localhost:8000/api/service-history/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setHistory(response.data);
    } catch (err) {
      console.error('❌ Error fetching service history:', err);
      setError('Could not load service history. Please try again.');
    }
  };

  const cancelBooking = async (bookingId) => {
    try {
      const token = localStorage.getItem('access_token');
      await axios.post(
        `http://localhost:8000/api/bookings/${bookingId}/cancel/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setHistory((prevHistory) =>
        prevHistory.map((booking) =>
          booking.id === bookingId ? { ...booking, status: 'Cancelled' } : booking
        )
      );
    } catch (err) {
      console.error('❌ Failed to cancel booking:', err);
      alert('Failed to cancel booking. Please try again.');
    }
  };

  const normalize = (str) => (str || '').toLowerCase().trim();

  const filteredAndSearchedHistory = history.filter((booking) => {
    const normalizedStatus = normalize(booking.status || 'Active');
    const matchesStatus = statusFilter === 'All' || normalizedStatus === normalize(statusFilter);

    const matchesSearch =
      normalize(booking.ticket_id).includes(normalize(searchTerm)) ||
      normalize(booking.service_type).includes(normalize(searchTerm));

    return matchesStatus && matchesSearch;
  });

  const renderStatusBadge = (status) => {
    const normalized = (status || 'Active').toLowerCase();
    const badgeClass =
      normalized === 'completed'
        ? 'badge-completed'
        : normalized === 'cancelled'
        ? 'badge-cancelled'
        : 'badge-active';

    return <span className={`status-badge ${badgeClass}`}>{status || 'Active'}</span>;
  };

  return (
    <div className="service-history">
      <h2>Your Service History</h2>

      {error && <p className="error-message">{error}</p>}

      <div className="controls">
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="Active">Active</option>
          <option value="Cancelled">Cancelled</option>
          <option value="Completed">Completed</option>
        </select>

        <input
          type="text"
          placeholder="Search service type or ticket ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredAndSearchedHistory.length === 0 && !error ? (
        <p>No matching service records found.</p>
      ) : (
        <div className="table-wrapper">
          <table className="history-table">
            <thead>
              <tr>
                <th>Ticket ID</th>
                <th>Service Type</th>
                <th>Preferred Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSearchedHistory.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.ticket_id}</td>
                  <td>{booking.service_type}</td>
                  <td>{booking.preferred_date}</td>
                  <td>{renderStatusBadge(booking.status)}</td>
                  <td>
                    {booking.status === 'Cancelled' ? (
                      <button className="btn-cancelled" disabled>Cancelled</button>
                    ) : booking.status === 'Completed' ? (
                      <button className="btn-completed" disabled>Completed</button>
                    ) : (
                      <button onClick={() => cancelBooking(booking.id)} className="btn-cancel">Cancel</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ServiceHistory;