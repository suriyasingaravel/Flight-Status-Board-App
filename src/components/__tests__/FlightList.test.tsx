import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { FlightList } from "../FlightList";

const mock = new MockAdapter(axios);

const mockFlights = [
  {
    id: "1",
    flightNumber: "AI101",
    airline: "Air India",
    origin: "Delhi",
    destination: "Mumbai",
    departureTime: "2024-02-03T10:00:00Z",
    status: "On Time",
  },
  {
    id: "2",
    flightNumber: "EK502",
    airline: "Emirates",
    origin: "Dubai",
    destination: "Bangalore",
    departureTime: "2024-02-03T12:30:00Z",
    status: "Delayed",
  },
];

describe("FlightList Component", () => {
  beforeEach(() => {
    mock.reset();
  });

  it("should render flight list and fetch data", async () => {
    mock
      .onGet("https://flight-status-mock.core.travelopia.cloud/flights")
      .reply(200, mockFlights);

    render(
      <MemoryRouter>
        <FlightList />
      </MemoryRouter>
    );

    expect(screen.getByText(/Departures/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("AI101")).toBeInTheDocument();
      expect(screen.getByText("EK502")).toBeInTheDocument();
    });
  });

  it("should show error message on API failure", async () => {
    mock
      .onGet("https://flight-status-mock.core.travelopia.cloud/flights")
      .reply(500);

    render(
      <MemoryRouter>
        <FlightList />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(
        screen.getByText("The requested flight details are unavailable.")
      ).toBeInTheDocument();
    });
  });
});
