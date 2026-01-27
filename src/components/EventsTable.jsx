import React, { useEffect, useMemo, useState } from 'react';
import '../index.css';

const EventsTable = ({ events }) => {
  const hasEvents = Array.isArray(events) && events.length > 0;
  const pageSize = 10;
  const [page, setPage] = useState(1);

  const totalPages = useMemo(() => {
    if (!hasEvents) return 1;
    return Math.max(1, Math.ceil(events.length / pageSize));
  }, [events, hasEvents]);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
    if (page < 1) setPage(1);
  }, [page, totalPages]);

  const pageEvents = useMemo(() => {
    if (!hasEvents) return [];
    const start = (page - 1) * pageSize;
    return events.slice(start, start + pageSize);
  }, [events, hasEvents, page]);

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
            pageEvents.map((event) => (
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

      {hasEvents && totalPages > 1 && (
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
          <button type="button" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
            Prev
          </button>
          <span>
            Page {page} / {totalPages}
          </span>
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default EventsTable;
