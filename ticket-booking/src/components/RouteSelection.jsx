import React from 'react';
import { useBooking } from '../context/BookingContext';
import './RouteSelection.css';

const RouteSelection = () => {
  const { routes, selectedRoute, selectRoute, nextStep } = useBooking();

  const handleRouteSelect = (routeId) => {
    selectRoute(routeId);
    nextStep();
  };

  return (
    <div className="route-selection">
      <h2>Select Your Route</h2>
      <div className="route-list">
        {routes.map((route) => (
          <div
            key={route.id}
            className={`route-item ${selectedRoute?.id === route.id ? 'selected' : ''}`}
            onClick={() => handleRouteSelect(route.id)}
          >
            <h3>{route.name}</h3>
            <p>Price: ${route.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
      {!selectedRoute && <p>Please select a route to proceed.</p>}
    </div>
  );
};

export default RouteSelection;