import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../css/flightDetails.css";

interface Flight {
  id: string;
  flightNumber: string;
  airline: string;
  origin: string;
  destination: string;
  departureTime: string;
  status: string;
}

// Explicitly define the type for date formatting options
const options: Intl.DateTimeFormatOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: true,
  timeZone: "Asia/Kolkata",
};

const API_URL = "https://flight-status-mock.core.travelopia.cloud/flights";

export const FlightDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [flight, setFlight] = useState<Flight | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFlightDetails = async () => {
      if (id) {
        try {
          const response = await axios.get<Flight>(`${API_URL}/${id}`);
          setFlight(response.data);
          setError(null);
        } catch (err) {
          setError("The requested flight details are unavailable.");
          console.error("Error fetching flight details:", err);
        }
      }
    };

    fetchFlightDetails();

    const interval = setInterval(fetchFlightDetails, 10000);
    return () => clearInterval(interval); // Clear interval on component unmount
  }, [id]);

  if (error) return <p className="error-message">{error}</p>;
  if (!flight) return <p className="loading-message">Loading...</p>;

  const departureTime = flight.departureTime
    ? new Date(flight.departureTime)
    : null;
  const formattedDepartureTime = departureTime
    ? departureTime.toLocaleString("en-IN", options)
    : "N/A";

  return (
    <div className="flight-details-page">
      <h1 className="details-title">Flight Details</h1>
      <div className="details-container">
        <p className="detail-item">
          <strong>Flight Number:</strong>{" "}
          <span
            style={{
              color: "#ecc94b",
              fontWeight: "bold",
              backgroundColor: "#2d3748",
            }}
          >
            {flight.flightNumber}
          </span>
        </p>
        <p className="detail-item">
          <strong>Airline:</strong> {flight.airline}
        </p>
        <p className="detail-item">
          <strong>Origin:</strong> {flight.origin}
        </p>
        <p className="detail-item">
          <strong>Destination:</strong> {flight.destination}
        </p>
        <p className="detail-item">
          <strong>Departure Time:</strong>{" "}
          <span
            style={{
              color: "#ecc94b",
              fontWeight: "bold",
              backgroundColor: "#2d3748",
            }}
          >
            {formattedDepartureTime}
          </span>
        </p>
        <p className="detail-item">
          <strong>Status:</strong>
          <span
            className={`status-badge ${
              flight.status === "On Time"
                ? "status-on-time"
                : flight.status === "Delayed"
                ? "status-delayed"
                : "status-cancelled"
            }`}
          >
            {flight.status}
          </span>
        </p>
      </div>
    </div>
  );
};

export default FlightDetails;
