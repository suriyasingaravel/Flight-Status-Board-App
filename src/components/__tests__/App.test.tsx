import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../../App";

describe("App Component", () => {
  it("should render the FlightList component by default", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText("Departures")).toBeInTheDocument();
  });

  it("should show 404 page for unknown routes", () => {
    render(
      <MemoryRouter initialEntries={["/random-route"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText("Request page not found")).toBeInTheDocument();
  });
});
