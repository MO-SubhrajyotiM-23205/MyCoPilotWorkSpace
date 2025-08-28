import { useState } from 'react'
import './App.css'
import DoctorMaster from './DoctorMaster';
import AppointmentForm from './assets/appointmentForm';
import DoctorEntry from './DoctorEntry';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <AppointmentForm/>

    </>
  )
}

export default App
