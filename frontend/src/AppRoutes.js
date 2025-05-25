import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from './pages/LoginPage/Login';
import SignUp from './pages/SignUpPage/SignUp';
import Profile from './pages/Profile/Profile';
import Admin from './pages/Admin/Admin';
import BookingPage from './pages/BookingPage/BookingPage';
import PassengerDetails from './pages/BookingPage/PassengerDetails';
import PaymentPage from './pages/BookingPage/Payment';
import MyBookingPage from './pages/MyBookingPage/MyBookingPage';
import Guide from './pages/Guide/Guide';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/mybooking" element={<MyBookingPage />} />
      <Route path="/admin/*" element={<Admin />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />    
      <Route path="/guide" element={<Guide />} />    
      <Route path="/booking" element={<BookingPage />} />
      <Route
        path="/booking/passenger-details"
        element={<PassengerDetails />}
      />
      <Route path="/booking/payment" element={<PaymentPage />} />

      {/* Add more routes here */}
      <Route path="*" element={<h1 className="">404 Not Found</h1>} />
    </Routes>
  );
}

export default AppRoutes;
