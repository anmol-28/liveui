import React from 'react';
import '../index.css';

const EventsTable = ({ events }) => {
  const hasEvents = Array.isArray(events) && events.length > 0;

  return (
    <div className="events-table-container">
      <table className="events-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Org</th>
            <th>Amount</th>
            <th>Region</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {!hasEvents && (
            <tr>
              <td colSpan="5" className="empty-row">Waiting for data…</td>
            </tr>
          )}
          {hasEvents &&
            events.map((event) => (
              <tr key={event.id}>
                <td>{event.id}</td>
                <td>{event.org}</td>
                <td>{event.amount}</td>
                <td>{event.region}</td>
                <td>{event.updated_at || event.event_time}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventsTable;
