import { Routes, Route } from "react-router-dom";
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

function App() {
  return (
    <Routes>

      {/* Authentication */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPass />} />

      {/* Home */}
      <Route
        path="/"
        element={
          <>
            <Navbar />
            <Home />
            <Footer />
          </>
        }
      />

      {/* Doctor */}
      <Route
        path="/aboutdoctor"
        element={
          <>
            <Navbar />
            <AboutDoctor />
            <Footer />
          </>
        }
      />

      {/* FAQ */}
      <Route
        path="/faq"
        element={
          <>
            <Navbar />
            <FAQ />
            <Footer />
          </>
        }
      />

      {/* Contact */}
      <Route
        path="/contact"
        element={
          <>
            <Navbar />
            <Contact />
            <Footer />
          </>
        }
      />

      {/* Services */}
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

      {/* Testimonials */}
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

      {/* Schedule */}
      <Route
        path="/schedule"
        element={
          <>
            <Navbar />
            <SchedulePage />
            <Footer />
          </>
        }
      />

      {/* Appointment */}
      <Route
        path="/appointment"
        element={
          <>
            <Navbar />
            <Appointment />
            <Footer />
          </>
        }
      />

    </Routes>
  );
}

export default App;