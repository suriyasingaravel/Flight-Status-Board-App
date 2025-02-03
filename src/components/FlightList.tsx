import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/flightList.css";

interface Flight {
  id: string;
  flightNumber: string;
  airline: string;
  origin: string;
  destination: string;
  departureTime: string;
  status: string;
}

const API_URL = "https://flight-status-mock.core.travelopia.cloud/flights";

export const FlightList: React.FC = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentDateTime, setCurrentDateTime] = useState<string>("");

  const navigate = useNavigate();

  const fetchFlights = async () => {
    try {
      const response = await axios.get<Flight[]>(API_URL);
      setFlights(response.data);
      setError(null);
    } catch (err) {
      setError("The requested flight details are unavailable.");
    }
  };

  useEffect(() => {
    fetchFlights();
    const interval = setInterval(fetchFlights, 10000);
    return () => clearInterval(interval);
  }, []);

  // Update the current date and time every second
  useEffect(() => {
    const updateDateTime = () => {
      const indiaDateTime = new Date().toLocaleString("en-GB", {
        timeZone: "Asia/Kolkata",
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setCurrentDateTime(indiaDateTime);
    };

    updateDateTime();
    const timeInterval = setInterval(updateDateTime, 1000);
    return () => clearInterval(timeInterval);
  }, []);

  return (
    <div className="departure-board">
      <h1 className="board-title">Departures</h1>
      <h2 className="current-date-time">{currentDateTime}</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="board-container">
        <table className="flight-table">
          <thead>
            <tr className="board-header">
              <th>Flight Number</th>
              <th>Airline</th>
              <th>Origin</th>
              <th>Destination</th>
              <th>Departure Time</th>
              <th>Status</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {flights.map((flight) => {
              const departureTime = new Date(
                flight.departureTime
              ).toLocaleTimeString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
              });

              return (
                <tr key={flight.id} className="board-row">
                  <td style={{ color: "#ecc94b", fontWeight: "bold" }}>
                    {flight.flightNumber}
                  </td>
                  <td>{flight.airline}</td>
                  <td>{flight.origin}</td>
                  <td>{flight.destination}</td>
                  <td style={{ color: "#ecc94b", fontWeight: "bold" }}>
                    {departureTime}
                  </td>
                  <td
                    className={`status ${flight.status
                      .toLowerCase()
                      .replace(/ /g, "-")}`}
                  >
                    {flight.status}
                  </td>
                  <td>
                    <button
                      className="details-button"
                      onClick={() => navigate(`/flights/${flight.id}`)}
                    >
                      View More
                    </button>
                    {/* <button
                      className="btn"
                      onClick={() => navigate(`/flights/${flight.id}`)}
                    >
                      <span className="icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="24"
                          fill="currentColor"
                          className="bi bi-airplane-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M6.428 1.151C6.708.591 7.213 0 8 0s1.292.592 1.572 1.151C9.861 1.73 10 2.431 10 3v3.691l5.17 2.585a1.5 1.5 0 0 1 .83 1.342V12a.5.5 0 0 1-.582.493l-5.507-.918-.375 2.253 1.318 1.318A.5.5 0 0 1 10.5 16h-5a.5.5 0 0 1-.354-.854l1.319-1.318-.376-2.253-5.507.918A.5.5 0 0 1 0 12v-1.382a1.5 1.5 0 0 1 .83-1.342L6 6.691V3c0-.568.14-1.271.428-1.849Z"></path>
                        </svg>
                      </span>
                      <span className="text">View More</span>
                    </button> */}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FlightList;
