import React from 'react';
import { useBooking } from '../context/BookingContext';
import RouteSelection from './RouteSelection';
import TransportSelection from './TransportSelection';
import TicketSelection from './TicketSelection';
import BookingSummary from './BookingSummary';
import './BookingForm.css';

const BookingForm = () => {
  const { currentStep } = useBooking();

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <RouteSelection />;
      case 2:
        return <TransportSelection />;
      case 3:
        return <TicketSelection />;
      case 4:
        return <BookingSummary />;
      default:
        return <RouteSelection />;
    }
  };

  return (
    <div className="booking-form-container">
      <h1>Ticket Booking</h1>
      <div className="step-indicator">
        <span className={currentStep === 1 ? 'active' : ''}>Route</span>
        <span className={currentStep === 2 ? 'active' : ''}>Transport</span>
        <span className={currentStep === 3 ? 'active' : ''}>Tickets</span>
        <span className={currentStep === 4 ? 'active' : ''}>Summary</span>
      </div>
      <div className="booking-form-content">
        {renderStep()}
      </div>
    </div>
  );
};

export default BookingForm;