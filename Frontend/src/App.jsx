import { Routes, Route } from 'react-router-dom'
import Navbar from '../src/Components/Navbar'
import Footer from '../src/Components/Footer'
import Login from './Auth/Login'
import Signup from './Auth/Signup'
import ForgotPass from './Auth/forgotpass'
import Home from './Pages/Home'
import AboutDoctor from "./Pages/AboutDoctor";
import Services from "./Pages/Services";
import Testimonials from "./Pages/Testimonials";

import DoctorsDashboard from "./DoctorDashboard/DoctorsDashboard";
import Dashboard from "./DoctorDashboard/Dashboard";
import AppointmentManagement from "./DoctorDashboard/AppointmentManagement";
import Schedule from "./DoctorDashboard/Schedule";
import ProfileSettings from "./DoctorDashboard/ProfileSettings";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPass />} />
      <Route 
        path="/aboutdoctors"
        element={
          <>
            <Navbar />
            <AboutDoctor />
            <Footer />
          </>
        } 
      />
      <Route
        path="/services"
        element={
          <>
            <Navbar />
            <Services />
            <Footer />
          </>
        }
      />
      <Route
        path="/testimonials"
        element={
          <>
            <Navbar />
            <Testimonials />
            <Footer />
          </>
        }
      />
      <Route path="/doctor-dashboard" element={<DoctorsDashboard />}>
        <Route index element={<Dashboard />} />
        <Route path="appointments" element={<AppointmentManagement />} />
        <Route path="schedule" element={<Schedule />} />
        <Route path="profile" element={<ProfileSettings />} />
      </Route>

      <Route
        path="/"
        element={
          <>
            <Home />
          </>
        }
      />
    </Routes>
  )
}

export default App