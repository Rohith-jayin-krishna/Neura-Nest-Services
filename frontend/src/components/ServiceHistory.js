import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ServiceHistory.css';

const ServiceHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        setError('⚠️ You must be logged in to view your service history.');
        return;
      }

      const params = {
        status: statusFilter,
        search: searchTerm,
        page: currentPage,
      };

      const response = await axios.get('http://localhost:8000/api/service-history/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params,
      });

      setBookings(response.data.results || []);
      setTotalPages(response.data.total_pages || 1);
    } catch (err) {
      console.error('❌ Error fetching service history:', err);
      setError('Could not load service history. Please try again.');
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [currentPage, statusFilter, searchTerm]);

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

      fetchHistory();
    } catch (err) {
      console.error('❌ Failed to cancel booking:', err);
      alert('Failed to cancel booking. Please try again.');
    }
  };

  const renderStatusBadge = (status) => {
    const normalized = (status || 'active').toLowerCase();
    const badgeClass =
      normalized === 'completed'
        ? 'badge-completed'
        : normalized === 'cancelled'
        ? 'badge-cancelled'
        : 'badge-active';

    return <span className={`status-badge ${badgeClass}`}>{normalized.charAt(0).toUpperCase() + normalized.slice(1)}</span>;
  };

  return (
    <div className="service-history">
      <h2>Your Service History</h2>

      {error && <p className="error-message">{error}</p>}

      <div className="controls">
        <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}>
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="cancelled">Cancelled</option>
          <option value="completed">Completed</option>
        </select>

        <input
          type="text"
          placeholder="Search by ticket or service type"
          value={searchTerm}
          onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
        />
      </div>

      {bookings.length === 0 && !error ? (
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
              {bookings.map((booking) => {
                const normalizedStatus = (booking.status || '').toLowerCase();
                return (
                  <tr key={booking.id}>
                    <td>{booking.ticket_id}</td>
                    <td>{booking.service_type}</td>
                    <td>{booking.preferred_date}</td>
                    <td>{renderStatusBadge(booking.status)}</td>
                    <td>
                      {normalizedStatus === 'active' ? (
                        <button onClick={() => cancelBooking(booking.id)} className="btn-cancel">Cancel</button>
                      ) : normalizedStatus === 'cancelled' ? (
                        <button className="btn-cancelled" disabled>Cancelled</button>
                      ) : (
                        <button className="btn-completed" disabled>Completed</button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="pagination">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="nav-button"
              >
                ◀ Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`page-number ${currentPage === i + 1 ? 'active-page' : ''}`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="nav-button"
              >
                Next ▶
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ServiceHistory;