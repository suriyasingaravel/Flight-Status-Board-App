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

export const FlightList = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentDateTime, setCurrentDateTime] = useState<string>("");

  const navigate = useNavigate();

  const fetchFlights = async () => {
    setLoading(true);
    try {
      const response = await axios.get<Flight[]>(API_URL);
      setFlights(response.data);
      setError(null);
    } catch (err) {
      setError("The requested flight details are unavailable.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlights();
    const interval = setInterval(fetchFlights, 15000);
    return () => clearInterval(interval);
  }, []);

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

      {loading ? (
        <div className="loading-container">
          <p>Loading flights...</p>
        </div>
      ) : (
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
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FlightList;
