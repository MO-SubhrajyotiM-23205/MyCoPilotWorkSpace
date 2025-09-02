import { useState } from 'react'
import './App.css'
import DoctorMaster from './DoctorMaster';
import AppointmentForm from './assets/appointmentForm';
import DoctorEntry from './DoctorEntry';
import NavigationTest from './NavigationTest';
import Contact from './Contact';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NavigationTest />}>
            <Route index element={<DoctorMaster />} />
            <Route path="about" element={<div>About Page</div>} />
            <Route path="contact" element={<Contact />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
