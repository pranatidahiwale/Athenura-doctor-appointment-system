import { Routes, Route } from 'react-router-dom'
import Navbar from '../src/Components/Navbar'
import Footer from '../src/Components/Footer'
import Login from './Auth/Login'
import Signup from './Auth/Signup'
import ForgotPass from './Auth/forgotpass'
import Home from './Pages/Home'
import AboutDoctor from '../src/Pages/AboutDoctor'
import FAQ from '../src/Pages/FAQ';
import Contact from '../src/Pages/Contact';
import Services from "./Pages/Services";
import Testimonials from "./Pages/Testimonials";
import SchedulePage from './Pages/Schedule'
import Appointment from './Pages/Appointment'


function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="/signup" element={<Signup />} />

      <Route path="/forgot-password" element={<ForgotPass />} />
      <Route path="/aboutDoctor" element={<>  <Navbar /> <AboutDoctor /> <Footer /></>} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/contact" element={<Contact />} />
        <Route
        path="/"


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
        path="/schedule"
        element={
          <>
            <SchedulePage />
            <Footer />
          </>
        }
      />

      <Route
        path="/appointment"
        element={
          <>
            <Appointment />
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