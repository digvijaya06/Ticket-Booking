import React from 'react';
import { useBooking } from '../context/BookingContext';
import './TransportSelection.css';

const transportOptions = [
  { type: 'bus', name: 'Bus', icon: '🚌' },
  { type: 'train', name: 'Train', icon: '🚆' },
  { type: 'flight', name: 'Flight', icon: '✈️' },
];

const TransportSelection = () => {
  const { transportType, selectTransportType, nextStep, prevStep } = useBooking();

  const handleSelectTransport = (type) => {
    selectTransportType(type);
    nextStep();
  };

  return (
    <div className="transport-selection">
      <h2>Select Transport Type</h2>
      <div className="transport-options">
        {transportOptions.map((option) => (
          <div
            key={option.type}
            className={`transport-item ${transportType === option.type ? 'selected' : ''}`}
            onClick={() => handleSelectTransport(option.type)}
          >
            <span className="transport-icon">{option.icon}</span>
            <h3>{option.name}</h3>
          </div>
        ))}
      </div>
      <div className="navigation-buttons">
        <button onClick={prevStep} className="prev-button">Previous</button>
      </div>
    </div>
  );
};

export default TransportSelection;