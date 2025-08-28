import React, { useState, useEffect } from 'react';
import './appointmentForm.css';

const AppointmentForm = () => {
    const [message, setMessage] = useState('');
    const [doctors, setDoctors] = useState([]);
    const specializations = ['Cardiology', 'Dermatology', 'Pediatrics', 'Radiology'];
    const [formData, setFormData] = useState({
        patientName: '',
        doctor: '',
        date: '',
        time: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    useEffect(() => {
        const storedDoctors = JSON.parse(localStorage.getItem('doctors')).filter(doc => doc.specialization === formData.specialization) || [];
        setDoctors(storedDoctors);
    }, [formData.specialization]);

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem('appointments', JSON.stringify([...JSON.parse(localStorage.getItem('appointments') || '[]'), formData]));
        setMessage('Appointment booked successfully!');
        setTimeout(() => {
            setMessage('');
        }, 2000);
        setFormData({
            patientName: '',
            doctor: '',
            date: '',
            time: ''
        });
        // Handle form submission logic
    };

    return (
        <form className="appointment-form" onSubmit={handleSubmit}>
            <h2>Book Appointment</h2>
            {message && <div className="success-message">{message}</div>}
            <label>
                Patient Name:
                <input type="text" name="patientName" value={formData.patientName} onChange={handleChange} required />
            </label>
            <label>
                Specialization:
                <select name="specialization" value={formData.specialization} onChange={handleChange} required>
                    <option value="">Select Specialization</option>
                    {specializations.map((spec, idx) => (
                        <option key={idx} value={spec}>{spec}</option>
                    ))}
                </select>
            </label>
            <label>
                Doctor:
                <select name="doctor" onChange={handleChange} value={formData.doctor} required>
                    <option value="">Select Doctor</option>
                    {doctors.map((doc, idx) => (
                        <option key={idx} value={doc.name}>{doc.name}</option>
                    ))}
                </select>
            </label>
            <label>
                Date:
                <input type="date" name="date" onChange={handleChange} value={formData.date} required />
            </label>
            <label>
                Time:
                <input type="time" name="time" onChange={handleChange} value={formData.time} required />
            </label>
            <button type="submit" onClick={handleSubmit}>Book Appointment</button>
        </form>
    );
};

export default AppointmentForm;
