import React from "react";
import { Route, Routes } from "react-router-dom";
import FlightList from "../components/FlightList";
import FlightDetails from "../components/FlightDetails";
import NotFound from "../components/NotFound";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<FlightList />} />
      <Route path="/flights/:id" element={<FlightDetails />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AllRoutes;
