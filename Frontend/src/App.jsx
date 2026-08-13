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

      {/* Login */}
      <Route
        path="/login"
        element={<Login />}
      />

      {/* Signup */}
      <Route
        path="/signup"
        element={<Signup />}
      />

      {/* Forgot Password */}
      <Route
        path="/forgot-password"
        element={<ForgotPass />}
      />

      {/* About Doctor */}
      <Route
        path="/aboutDoctor"
        element={
          <>
            <Navbar />
            <AboutDoctor />
            <Footer />
          </>
        }
      />

      {/* About Doctor - alternate URL */}
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

      {/* Home */}
      <Route
        path="/"
        element={
          <>
            <Home />
          </>
        }
      />

    </Routes>
  );
}

export default App;