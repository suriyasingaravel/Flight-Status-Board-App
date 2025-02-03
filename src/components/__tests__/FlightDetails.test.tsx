import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { FlightDetails } from "../FlightDetails";

const mock = new MockAdapter(axios);

describe("FlightDetails Component", () => {
  it("should display flight details when API call succeeds", async () => {
    mock
      .onGet("https://flight-status-mock.core.travelopia.cloud/flights/1")
      .reply(200, {
        id: "1",
        airline: "Air India",
        status: "On Time",
      });

    render(
      <MemoryRouter initialEntries={["/flights/1"]}>
        <Routes>
          <Route path="/flights/:id" element={<FlightDetails />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.getByText("Air India")).toBeInTheDocument()
    );
    expect(screen.getByText("On Time")).toBeInTheDocument();
  });

  it("should display an error message when API returns 404", async () => {
    mock
      .onGet("https://flight-status-mock.core.travelopia.cloud/flights/1")
      .reply(404);

    render(
      <MemoryRouter initialEntries={["/flights/1"]}>
        <Routes>
          <Route path="/flights/:id" element={<FlightDetails />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(
        screen.getByText("The requested flight details are unavailable.")
      ).toBeInTheDocument()
    );
  });
});
