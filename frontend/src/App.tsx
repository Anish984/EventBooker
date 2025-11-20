import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "./pages/Home";
import EventDetail from "./components/EventDetail";
import HostEvent from "./pages/HostEvent";
import BookTicket from "./components/BookTicket";
import { ThemeProvider } from "./components/themeProvider";
import QRPage from "./components/qrPage";
const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/event/:id" element={<EventDetail />} />
          <Route path="/host-event" element={<HostEvent />} />
          <Route path="/event/:id/book" element={<BookTicket />} />
          <Route path="/event/:id/qr" element={<QRPage/>} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};
export default App;
