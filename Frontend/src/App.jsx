import { Routes, Route } from 'react-router-dom'
import Navbar from '../src/Components/Navbar'
import Footer from '../src/Components/Footer'
import Login from './Auth/Login'
import Signup from './Auth/Signup'
import ForgotPass from './Auth/forgotpass'
import Home from './Pages/Home'
import AboutDoctor from '../src/Pages/AboutDoctor'
import FAQ from '../src/Pages/FAQ'
import Contact from '../src/Pages/Contact'

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