import React, { useEffect, useState } from 'react';
import SummaryCard from './components/SummaryCard';
import EventsTable from './components/EventsTable';
import ChartPlaceholder from './components/ChartPlaceholder';
import { fetchLiveState } from './api/liveStateApi';
import './index.css';

function App() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        const data = await fetchLiveState();
        if (isMounted && Array.isArray(data)) {
          setEvents(data);
        }
      } catch {
        if (isMounted) {
          setEvents([]);
        }
      }
    };

    load();
    const intervalId = setInterval(load, 5000);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, []);

  const totalEvents = events.length;
  const totalAmount = events.reduce(
    (sum, item) => sum + (Number(item.amount) || 0),
    0
  );
  const activeOrgs = new Set(events.map((item) => item.org)).size;

  return (
    <div className="app">
      <header className="header">
        <h1>Live Dashboard</h1>
      </header>
      
      <main className="main-content">
        <section className="summary-section">
          <SummaryCard title="Total Events" value={totalEvents} />
          <SummaryCard title="Total Amount" value={totalAmount} />
          <SummaryCard title="Active Orgs" value={activeOrgs} />
        </section>
        
        <section className="table-section">
          <EventsTable events={events} />
        </section>
        
        <section className="chart-section">
          <ChartPlaceholder />
        </section>
      </main>
    </div>
  );
}

export default App;
