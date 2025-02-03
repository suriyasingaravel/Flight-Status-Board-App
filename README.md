# Real-Time Flight Status Board - Frontend Task

## Overview

This project is a **React-based application** built using **TypeScript** that mimics a real-time flight status board. The application fetches flight details from an external API, updates the data at regular intervals, and allows users to view detailed flight information.This app is responsive for all screen sizes. The application is fully tested and deployed using **Netlify**.

## Features

### 1. Flight Table

- Fetches and displays a list of flights in a table format.
- Columns include:
  - Flight Number
  - Airline
  - Origin
  - Destination
  - Departure Time
  - Status (e.g., "On Time", "Delayed", "Boarding", "Departed")
- Auto-updates flight data at a specific interval to ensure real-time status updates.

### 2. Detail View

- Clicking on a row (or a link within a row) navigates the user to a **detailed flight view**.
- Fetches and displays comprehensive data for the selected flight.

### 3. Navigation

- Uses **React Router** for seamless navigation between the flight list and flight details pages.

### 4. Error Handling

- Provides appropriate feedback to users in case of:
  - API failures (network issues, exceeded API limit, etc.).
  - Unavailable flight details.

### 5. Styling

- Implements a clean and **user-friendly UI** to ensure easy readability of flight data.
- Uses **CSS with class-based styling** for a structured and maintainable approach.

---

## Tech Stack

- **React** (Frontend framework)
- **React Router DOM** (Navigation)
- **React Hooks** (State management and side effects)
- **TypeScript** (Static typing for better development experience)
- **Axios** (API calls)
- **Jest** (Unit testing framework)
- **Vite** (Project scaffolding and fast development build system)
- **CSS (Class-based file structure)** (Styling approach)
- **Netlify** (Deployment platform)

---

## API Details

1. Fetch all flights: `GET https://flight-status-mock.core.travelopia.cloud/flights`
2. Fetch flight details by ID: `GET https://flight-status-mock.core.travelopia.cloud/flights/:id`

---

## Project Structure

```
📦 flight-status-board
├── 📂 src
│   ├── 📂 components
│   │   ├── FlightList.tsx  # Fetches and displays flight list
│   │   ├── FlightDetails.tsx  # Fetches and displays flight details
│   ├── 📂 routes
│   │   ├── AppRouter.tsx  # Handles routing between components
│   ├── 📂 styles
│   │   ├── flightList.css  # Styles for FlightList component
│   │   ├── flightDetails.css  # Styles for FlightDetails component
│   ├── 📂 tests
│   │   ├── FlightList.test.tsx  # Jest test cases for FlightList
│   │   ├── FlightDetails.test.tsx  # Jest test cases for FlightDetails
│   ├── App.tsx  # Main App component
│   ├── main.tsx  # Entry point for the application
├── 📜 README.md  # Documentation
├── 📜 package.json  # Dependencies and scripts
├── 📜 tsconfig.json  # TypeScript configuration
├── 📜 vite.config.ts  # Vite configuration
```

---

## Installation & Setup

### Prerequisites

Ensure you have **Node.js** and **npm** installed.

### Steps to Run the Project Locally

1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo-name/flight-status-board.git
   cd flight-status-board
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```
   - The application will be available at `http://localhost:5173`.

---

## Running Tests

The project includes unit tests for key functionalities.
To run the tests, use:

```sh
npm run test
```

This command will execute **Jest tests** and validate the app's functionality.

---

## Deployment

The application is **deployed on Netlify**.
To deploy:

1. Push changes to the `main` branch.
2. Netlify will automatically build and deploy the latest version.
3. Access the deployed app at `https://your-netlify-url.netlify.app`

---

## Future Enhancements

- Add search and filter functionality for flights.
- Implement real-time WebSocket updates instead of polling.
- Enhance UI with animations and better responsiveness.

---

## Conclusion

This project successfully simulates a **real-time flight status board** using **React, TypeScript, and Jest**. It provides a **user-friendly UI**, **real-time updates**, and **smooth navigation**. The application is fully tested and deployed on Netlify, ensuring a high-quality and robust experience for users.
