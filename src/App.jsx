import React from 'react';
import SummaryCard from './components/SummaryCard';
import EventsTable from './components/EventsTable';
import ChartPlaceholder from './components/ChartPlaceholder';
import './index.css';

function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>Live Dashboard</h1>
      </header>
      
      <main className="main-content">
        <section className="summary-section">
          <SummaryCard title="Total Events" />
          <SummaryCard title="Total Amount" />
          <SummaryCard title="Active Orgs" />
        </section>
        
        <section className="table-section">
          <EventsTable />
        </section>
        
        <section className="chart-section">
          <ChartPlaceholder />
        </section>
      </main>
    </div>
  );
}

export default App;
