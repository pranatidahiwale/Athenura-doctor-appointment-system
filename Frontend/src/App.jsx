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

// Yeh component page change hone par window ko top par scroll kar dega
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Common Layout Component jisme Navbar aur Footer pehle se hain
function PageLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-transparent">
      
      {/* ScrollToTop component ko yaha routes ke upar rakha hai */}
      <ScrollToTop />
      
      <Routes>
        {/* Authentication Pages (Ab inme bhi Navbar aur Footer aa jayega) */}
        <Route path="/login" element={<PageLayout><Login /></PageLayout>} />
        <Route path="/signup" element={<PageLayout><Signup /></PageLayout>} />
        <Route path="/forgot-password" element={<PageLayout><ForgotPass /></PageLayout>} />

        {/* Main Pages */}
        <Route path="/" element={<PageLayout><Home /></PageLayout>} />
        <Route path="/aboutdoctor" element={<PageLayout><AboutDoctor /></PageLayout>} />
        <Route path="/faq" element={<PageLayout><FAQ /></PageLayout>} />
        <Route path="/contact" element={<PageLayout><Contact /></PageLayout>} />
        <Route path="/services" element={<PageLayout><Services /></PageLayout>} />
        <Route path="/testimonials" element={<PageLayout><Testimonials /></PageLayout>} />
        <Route path="/schedule" element={<PageLayout><SchedulePage /></PageLayout>} />
        <Route path="/appointment" element={<PageLayout><Appointment /></PageLayout>} />
      </Routes>

    </div>
  );
}

export default App;