### *The “Booking & State” Master*

A **React-based Ticket Booking application** that implements a **multi-step booking flow** using **React Router** and **Context API / Redux** for state management.
The project demonstrates handling complex forms, preserving application state, implementing price logic, validation rules, and custom CSS styling.

---

##  Project Description

This project simulates a real-world **ticket booking and checkout system** where users can:

* Select a travel route
* Choose passenger type (Student / Senior / Regular)
* Specify ticket quantity
* View a detailed price breakdown
* Confirm their booking

The booking state is preserved across routes and page refreshes using centralized state management.

---

##  Features

###  Multi-Step Booking Form (React Router)

* **Step 1:** Route Selection
* **Step 2:** Passenger Type & Ticket Quantity
* **Step 3:** Booking Confirmation

Navigation between steps is handled using **React Router**, ensuring a smooth step-based flow.

---

###  State Management (Context API / Redux)

* Booking data is stored globally
* User selections persist when:

  * Navigating back and forth between steps
  * Refreshing the browser
* Eliminates prop drilling and improves scalability

---

###  Price Engine

* A centralized utility function calculates ticket price
* Pricing logic:

  ```
  Final Price = Base Route Price – Applicable Discounts
  ```
* Discounts applied based on passenger type:

  *  Student Discount
  *  Senior Citizen Discount

---

###  Validation Rules

* Users **cannot book more than 5 tickets**
* Form-level validation prevents invalid submissions
* Ensures required fields are completed before proceeding

---

###  UI & Styling

* Custom **CSS** added for:

  * Step navigation
  * Forms & inputs
  * Buttons and layout
  * Price summary cards
* Responsive and clean user interface

---

##  Technical Focus

* React Functional Components
* React Router
* Context API / Redux
* Multi-Step Form Logic
* Centralized Price Calculation
* Client-Side Validation
* CSS Styling

---

##  Tech Stack

* **Frontend:** React.js
* **Routing:** React Router
* **State Management:** Context API / Redux
* **Styling:** CSS
* **Logic:** JavaScript Utility Functions

---



##  Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/digvijaya06/Ticket-Booking.git
   ```

2. **Navigate to the project folder**

   ```bash
   cd Ticket-Booking/ticket-booking
   ```

3. **Install dependencies**

   ```bash
   npm install
   ```

4. **Start the application**

  ```
   npm run dev
   ```

## 📊 Evaluation Criteria Mapping

| Requirement                | Marks | Status      |
| -------------------------- | ----- | ----------- |
| Multi-Step Booking Form    | 20    | ✅ Completed |
| State Management           | 15    | ✅ Completed |
| Price Calculation Engine   | 10    | ✅ Completed |
| Validation (Max 5 Tickets) | 5     | ✅ Completed |
| CSS Styling                | Bonus | ✅ Added     |


##  Learning Outcomes

* Implemented React Router for step-based navigation
* Managed global state efficiently
* Designed reusable pricing logic
* Built form validations for real-world constraints
* Improved UI with custom CSS



