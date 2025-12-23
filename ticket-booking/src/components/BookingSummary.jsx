import React from 'react';
import { useBooking } from '../context/BookingContext';
import './BookingSummary.css';

const BookingSummary = () => {
  const {
    selectedRoute,
    selectedTickets,
    transportType,
    totalTickets,
    totalBookingPrice,
    prevStep,
    resetBooking,
  } = useBooking();

  const handleConfirmBooking = () => {
    alert('Booking Confirmed!');
    resetBooking();
  };

  return (
    <div className="booking-summary">
      <h2>Booking Summary</h2>

      {selectedRoute && (
        <div className="summary-section">
          <h3>Route Details</h3>
          <p><strong>Route:</strong> {selectedRoute.name}</p>
          <p><strong>Base Price:</strong> ${selectedRoute.price.toFixed(2)}</p>
        </div>
      )}

      {transportType && (
        <div className="summary-section">
          <h3>Transport Type</h3>
          <p><strong>Type:</strong> {transportType.charAt(0).toUpperCase() + transportType.slice(1)}</p>
        </div>
      )}

      {totalTickets > 0 && (
        <div className="summary-section">
          <h3>Ticket Details</h3>
          <p><strong>Total Tickets:</strong> {totalTickets}</p>
          <ul>
            {Object.entries(selectedTickets).map(([type, quantity]) => quantity > 0 && (
              <li key={type}>{type.charAt(0).toUpperCase() + type.slice(1)}: {quantity}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="summary-total">
        <h3>Total Amount: ${totalBookingPrice.toFixed(2)}</h3>
      </div>

      <div className="navigation-buttons">
        <button onClick={prevStep} className="prev-button">Previous</button>
        <button onClick={handleConfirmBooking} className="confirm-button">Confirm Booking</button>
      </div>
    </div>
  );
};

export default BookingSummary;