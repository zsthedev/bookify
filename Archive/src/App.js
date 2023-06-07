import React from 'react';
import {
  Navbar,
  Footer,
  Login,
  Register,
  Home,
  Settings,
  NotFound,
  Booking,
  AdminBookings,
  AdminUsers,
  Revenue,
} from './Components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
const App = () => {
  const user = useSelector((state) => state.userReducer.user);
  return (
    <div className="d-flex flex-column h-100">
      {/* Navbar */}
      <Navbar />
      {/* Main Content Here */}
      <div className="flex-fill  h-100" style={{ paddingBottom: '6rem' }}>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/login" exact element={<Login />} />
          {/* Registering role based routes */}
          {user.role === 'admin' ? (
            <>
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/bookings" element={<AdminBookings />} />
              <Route path="/admin/revenue" element={<Revenue />} />
            </>
          ) : (
            <>
              <Route path="/register" exact element={<Register />} />
              <Route path="/settings" exact element={<Settings />} />
              <Route path="/bookings" exact element={<Booking />} />
            </>
          )}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      {/* Main Content Ends */}

      {/* Displaying Footer */}
      <Footer />
      {/* For showing toasts */}
      <ToastContainer />
    </div>
  );
};

export default App;
