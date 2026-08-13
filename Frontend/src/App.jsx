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
    <div className="min-h-screen flex flex-col bg-transparent">
      
      <Navbar />

      <main className="flex-grow">
        <Routes>
          {/* Authentication Pages  */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPass />} />

          {/* Main Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/aboutdoctor" element={<AboutDoctor />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/appointment" element={<Appointment />} />
        </Routes>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}

export default App;