import React from 'react';
import '../index.css';

const EventsTable = () => {
  return (
    <div className="events-table-container">
      <table className="events-table">
        <thead>
          <tr>
            <th>Org</th>
            <th>Amount</th>
            <th>Region</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan="4" className="empty-row">Waiting for data…</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default EventsTable;
