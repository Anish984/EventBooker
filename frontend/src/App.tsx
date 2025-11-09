import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "./pages/Home";
import EventDetail from "./components/EventDetail";
import HostEvent from "./pages/HostEvent";
import BookTicket from "./components/BookTicket";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/event/:id" element={<EventDetail />} />
        <Route path="/host-event" element={<HostEvent />} />
        <Route path="/event/:id/book" element={<BookTicket />} />
      </Routes>
    </Router>
  );
};
export default App;
