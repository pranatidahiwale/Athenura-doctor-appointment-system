import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

import Login from "./Auth/Login";
import Signup from "./Auth/Signup";
import ForgotPass from "./Auth/forgotpass";

import Home from "./Pages/Home";
import AboutDoctor from "./Pages/AboutDoctor";
import FAQ from "./Pages/FAQ";
import Contact from "./Pages/Contact";
import Services from "./Pages/Services";
import Testimonials from "./Pages/Testimonials";
import SchedulePage from "./Pages/Schedule";
import Appointment from "./Pages/Appointment";

import DoctorsDashboard from "./DoctorDashboard/DoctorsDashboard";
import Dashboard from "./DoctorDashboard/Dashboard";
import AppointmentManagement from "./DoctorDashboard/AppointmentManagement";
import Schedule from "./DoctorDashboard/Schedule";
import ProfileSettings from "./DoctorDashboard/ProfileSettings";

function App() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/doctor-dashboard");

  return (
    <div className="min-h-screen flex flex-col bg-transparent">
      {!isDashboard && <Navbar />}

      <main className="flex-grow">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPass />} />

          <Route path="/" element={<Home />} />
          <Route path="/aboutdoctor" element={<AboutDoctor />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/appointment" element={<Appointment />} />

          <Route path="/doctor-dashboard" element={<DoctorsDashboard />}>
            <Route index element={<Dashboard />} />
            <Route path="appointments" element={<AppointmentManagement />} />
            <Route path="schedule" element={<Schedule />} />
            <Route path="profile" element={<ProfileSettings />} />
          </Route>
        </Routes>
      </main>

      {!isDashboard && <Footer />}
    </div>
  );
}

export default App;