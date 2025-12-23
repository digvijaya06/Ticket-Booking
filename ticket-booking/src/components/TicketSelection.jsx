import React, { useCallback } from 'react';
import { useBooking } from '../context/BookingContext';
import './TicketSelection.css';

const ticketTypes = [
  { type: 'adult', name: 'Adult' },
  { type: 'student', name: 'Student' },
  { type: 'senior', name: 'Senior' },
];

const TicketSelection = () => {
  const {
    selectedTickets,
    updateTicketQuantity,
    totalTickets,
    MAX_TICKETS,
    nextStep,
    prevStep,
  } = useBooking();

  const handleQuantityChange = useCallback((type, delta) => {
    const currentQuantity = selectedTickets[type] || 0;
    const newQuantity = Math.max(0, currentQuantity + delta);

    // Calculate total tickets if this change were applied
    const otherTickets = Object.entries(selectedTickets)
      .filter(([t]) => t !== type)
      .reduce((sum, [, qty]) => sum + qty, 0);
    const potentialTotal = otherTickets + newQuantity;

    if (potentialTotal <= MAX_TICKETS) {
      updateTicketQuantity(type, newQuantity);
    } else {
      console.warn(`Cannot exceed ${MAX_TICKETS} tickets. Current total: ${totalTickets}. Attempted to add more.`);
      alert(`Cannot exceed ${MAX_TICKETS} tickets in total.`);
    }
  }, [selectedTickets, updateTicketQuantity, totalTickets, MAX_TICKETS]);

  const handleNext = () => {
    if (totalTickets > 0) {
      nextStep();
    } else {
      alert('Please select at least one ticket to proceed.');
    }
  };

  return (
    <div className="ticket-selection">
      <h2>Select Your Tickets</h2>
      <p className="ticket-info">Total Tickets Selected: {totalTickets} / {MAX_TICKETS}</p>
      <div className="ticket-types">
        {ticketTypes.map((ticket) => (
          <div key={ticket.type} className="ticket-item">
            <h3>{ticket.name}</h3>
            <div className="quantity-control">
              <button
                onClick={() => handleQuantityChange(ticket.type, -1)}
                disabled={(selectedTickets[ticket.type] || 0) === 0}
              >
                -
              </button>
              <span>{selectedTickets[ticket.type] || 0}</span>
              <button
                onClick={() => handleQuantityChange(ticket.type, 1)}
                disabled={totalTickets >= MAX_TICKETS && (selectedTickets[ticket.type] || 0) === (MAX_TICKETS - (totalTickets - (selectedTickets[ticket.type] || 0)))}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="navigation-buttons">
        <button onClick={prevStep} className="prev-button">Previous</button>
        <button onClick={handleNext} className="next-button" disabled={totalTickets === 0}>Next</button>
      </div>
    </div>
  );
};

export default TicketSelection;