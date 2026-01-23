import React from 'react';
import '../index.css';

const SummaryCard = ({ title }) => {
  return (
    <div className="summary-card">
      <h3 className="summary-card-title">{title}</h3>
      <p className="summary-card-value">--</p>
    </div>
  );
};

export default SummaryCard;
