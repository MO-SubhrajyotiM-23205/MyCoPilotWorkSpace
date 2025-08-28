import React, { useState, useEffect } from 'react';
import './appointmentForm.css';

const AppointmentForm = () => {
    const [message, setMessage] = useState('');
    const [doctors, setDoctors] = useState([]);
    const [file, setFile] = useState(null);
    const specializations = ['Cardiology', 'Dermatology', 'Pediatrics', 'Radiology'];
    const [formData, setFormData] = useState({
        patientName: '',
        doctor: '',
        date: '',
        time: '',
        testReport: null
    });
    

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setFormData({ ...formData, testReport: e.target.files[0] });
    };


    useEffect(() => {
        const storedDoctors = JSON.parse(localStorage.getItem('doctors')).filter(doc => doc.specialization === formData.specialization) || [];
        setDoctors(storedDoctors);
    }, [formData.specialization]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // For demonstration, only file name is saved. Real file upload needs backend or base64.
        const appointmentData = {
            ...formData,
            testReport: file ? file.name : null
        };
        localStorage.setItem('appointments', JSON.stringify([
            ...JSON.parse(localStorage.getItem('appointments') || '[]'),
            appointmentData
        ]));
        setMessage('Appointment booked successfully!');
        setTimeout(() => {
            setMessage('');
        }, 2000);
        setFormData({
            patientName: '',
            doctor: '',
            date: '',
            time: '',
            testReport: null
        });
        setFile(null);
        console.log('Appointment Data:', file);
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
            <label>
                Test Report (Upload):
                <input type="file" name="testReport" accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" onChange={handleFileChange} />
            </label>
            {file && (
                <div style={{marginBottom: '10px'}}>
                    Selected file: {file.name}
                    {file.type.startsWith('image/') ? (
                        <div style={{marginTop: '8px'}}>
                            <img src={URL.createObjectURL(file)} alt="Test Report Preview" style={{maxWidth: '200px', maxHeight: '200px', display: 'block'}} />
                        </div>
                    ) : file.type === 'application/pdf' ? (
                        <div style={{marginTop: '8px'}}>
                            <a href={URL.createObjectURL(file)} target="_blank" rel="noopener noreferrer">View PDF</a>
                        </div>
                    ) : (
                        <div style={{marginTop: '8px'}}>
                            <a href={URL.createObjectURL(file)} target="_blank" rel="noopener noreferrer">Download/View File</a>
                        </div>
                    )}
                </div>
            )}
            <button type="submit">Book Appointment</button>
        </form>
    );
};

export default AppointmentForm;
