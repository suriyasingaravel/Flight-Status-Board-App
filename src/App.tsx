import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FlightList } from "./components/FlightList";
import { FlightDetails } from "./components/FlightDetails";
import NotFound from "./components/NotFound";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FlightList />} />
        <Route path="/flights/:id" element={<FlightDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
