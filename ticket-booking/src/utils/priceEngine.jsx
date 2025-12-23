const DISCOUNTS = {
  adult: 0, // No discount
  student: 0.2, // 20% discount
  senior: 0.15, // 15% discount
};

const calculateFinalPrice = (basePrice, ticketType, quantity) => {
  if (basePrice <= 0 || quantity <= 0) return 0;

  const discount = DISCOUNTS[ticketType] || 0;
  const pricePerTicket = basePrice * (1 - discount);
  return pricePerTicket * quantity;
};

export default calculateFinalPrice;
