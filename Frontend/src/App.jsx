import { useEffect } from "react";
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
import PrivacyPolicy from "./Components/PrivacyPolicy";
import TermsOfService from "./Components/TermsOfService";
import HIPAACompliance from "./Components/HIPAACompliance";

// ScrollToTop utility component
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// PageLayout wrapper for standard pages 
function PageLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-transparent">
      <ScrollToTop />
      
      <Routes>
        {/* Auth Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />}/>
        <Route path="/forgot-password" element={<ForgotPass />}/>

        {/* Main Website Pages */}
        <Route path="/" element={<PageLayout><Home /></PageLayout>} />
        <Route path="/aboutdoctor" element={<PageLayout><AboutDoctor /></PageLayout>} />
        <Route path="/faq" element={<PageLayout><FAQ /></PageLayout>} />
        <Route path="/contact" element={<PageLayout><Contact /></PageLayout>} />
        <Route path="/services" element={<PageLayout><Services /></PageLayout>} />
        <Route path="/testimonials" element={<PageLayout><Testimonials /></PageLayout>} />
        <Route path="/schedule" element={<PageLayout><SchedulePage /></PageLayout>} />
        <Route path="/appointment" element={<PageLayout><Appointment /></PageLayout>} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/hipaa-compliance"  element={<HIPAACompliance />}/>
  
    
    
  
        
        <Route path="/doctor-dashboard" element={<DoctorsDashboard />}>
          <Route index element={<Dashboard />} />
          <Route path="appointments" element={<AppointmentManagement />} />
          <Route path="schedule" element={<Schedule />} />
          <Route path="profile" element={<ProfileSettings />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;