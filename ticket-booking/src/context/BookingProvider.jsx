import React, { useState, useCallback, useEffect } from 'react';
import { BookingContext, useBooking } from './BookingContext';
import calculateFinalPrice from '../utils/priceEngine';

export { useBooking };

const initialRoutes = [
  { id: 'route-1', name: 'Downtown to Airport', price: 25.00 },
  { id: 'route-2', name: 'Uptown to Downtown', price: 15.00 },
  { id: 'route-3', name: 'Airport to City Center', price: 30.00 },
];

const getInitialState = () => {
  try {
    const storedTickets = localStorage.getItem('selectedTickets');
    const storedRoute = localStorage.getItem('selectedRoute');
    const storedPassengerNames = localStorage.getItem('passengerNames');
    const storedTransportType = localStorage.getItem('transportType');
    return {
      tickets: storedTickets ? JSON.parse(storedTickets) : {},
      route: storedRoute ? JSON.parse(storedRoute) : null,
      passengerNames: storedPassengerNames ? JSON.parse(storedPassengerNames) : {},
      transportType: storedTransportType || null,
    };
  } catch (error) {
    console.error("Failed to load state from localStorage", error);
    return {
      tickets: {},
      route: null,
      passengerNames: {},
      transportType: null,
    };
  }
};

export const BookingProvider = ({ children }) => {
  const [selectedTickets, setSelectedTickets] = useState(getInitialState().tickets);
  const [selectedRoute, setSelectedRoute] = useState(getInitialState().route);
  const [passengerNames, setPassengerNames] = useState(getInitialState().passengerNames);
  const [transportType, setTransportType] = useState(getInitialState().transportType);
  const [currentStep, setCurrentStep] = useState(1); // New state for current step
  const MAX_TICKETS = 5;

  useEffect(() => {
    try {
      localStorage.setItem('selectedTickets', JSON.stringify(selectedTickets));
    } catch (error) {
      console.error("Failed to save selectedTickets to localStorage", error);
    }
  }, [selectedTickets]);

  useEffect(() => {
    try {
      localStorage.setItem('selectedRoute', JSON.stringify(selectedRoute));
    } catch (error) {
      console.error("Failed to save selectedRoute to localStorage", error);
    };
  }, [selectedRoute]);

  useEffect(() => {
    try {
      localStorage.setItem('passengerNames', JSON.stringify(passengerNames));
    } catch (error) {
      console.error("Failed to save passengerNames to localStorage", error);
    };
  }, [passengerNames]);

  useEffect(() => {
    try {
      localStorage.setItem('transportType', JSON.stringify(transportType));
    } catch (error) {
      console.error("Failed to save transportType to localStorage", error);
    };
  }, [transportType]);

  const totalTickets = Object.values(selectedTickets).reduce((sum, count) => sum + count, 0);

  // Calculate total booking price using the price engine
  const totalBookingPrice = React.useMemo(() => {
    if (!selectedRoute) return 0;
    let total = 0;
    for (const [type, quantity] of Object.entries(selectedTickets)) {
      total += calculateFinalPrice(selectedRoute.price, type, quantity);
    }
    return total;
  }, [selectedRoute, selectedTickets]);

  const selectRoute = useCallback((routeId) => {
    const route = initialRoutes.find(r => r.id === routeId);
    setSelectedRoute(route);
  }, []);

  const updateTicketQuantity = useCallback((type, quantity) => {
    setSelectedTickets(prevTickets => {
      const newTickets = { ...prevTickets, [type]: quantity };
      const newTotal = Object.values(newTickets).reduce((sum, count) => sum + count, 0);

      if (newTotal > MAX_TICKETS) {
        console.warn(`Cannot exceed ${MAX_TICKETS} tickets. Attempted to set total to ${newTotal}.`);
        return prevTickets;
      }
      return newTickets;
    });
  }, []);

  const updatePassengerName = useCallback((type, index, name) => {
    setPassengerNames(prevNames => ({
      ...prevNames,
      [type]: {
        ...prevNames[type],
        [index]: name,
      },
    }));
  }, []);

  const selectTransportType = useCallback((type) => {
    setTransportType(type);
  }, []);

  // Multi-step form navigation
  const nextStep = useCallback(() => {
    setCurrentStep(prevStep => prevStep + 1);
  }, []);

  const prevStep = useCallback(() => {
    setCurrentStep(prevStep => Math.max(1, prevStep - 1));
  }, []);

  const resetBooking = useCallback(() => {
    setSelectedTickets({});
    setSelectedRoute(null);
    setPassengerNames({});
    setTransportType(null);
    setCurrentStep(1);
  }, []);

  const value = {
    routes: initialRoutes,
    selectedRoute,
    selectedTickets,
    passengerNames,
    transportType,
    totalTickets,
    MAX_TICKETS,
    totalBookingPrice, // New: total calculated price
    currentStep, // New: current step in multi-step form
    selectRoute,
    updateTicketQuantity,
    updatePassengerName,
    selectTransportType,
    nextStep, // New: function to go to next step
    prevStep, // New: function to go to previous step
    resetBooking, // New: function to reset booking
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};

