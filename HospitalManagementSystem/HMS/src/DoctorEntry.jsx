import React, { useState, useEffect } from 'react';

const initialDoctor = { name: '', specialization: '', phone: '', email: '' };

const DoctorEntry = ({ isEdit, editIndex, doctorsList, onCancel, onDoctorListChange, setMessage, setEditIndex }) => {
    const [doctor, setDoctor] = useState(initialDoctor);
    const specializations = ['Cardiology', 'Dermatology', 'Pediatrics', 'Radiology'];

    useEffect(() => {
        if (isEdit && editIndex !== null && doctorsList[editIndex]) {
            setDoctor(doctorsList[editIndex]);
        } else {
            setDoctor(initialDoctor);
        }
    }, [isEdit, editIndex, doctorsList]);

    const handleChange = (e) => {
        setDoctor({ ...doctor, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let doctors = JSON.parse(localStorage.getItem('doctors')) || [];
        if (isEdit && editIndex !== null) {
            doctors[editIndex] = doctor;
            setMessage('Doctor updated successfully!');
        } else {
            doctors.push(doctor);
            setMessage('Doctor added successfully!');
        }
        localStorage.setItem('doctors', JSON.stringify(doctors));
        onDoctorListChange(doctors);
        setDoctor(initialDoctor);
        setEditIndex(null);
        setTimeout(() => setMessage(''), 2000);
    };

    return (
        <form onSubmit={handleSubmit} className="doctor-form">
            <label>
                Name:
                <input type="text" name="name" value={doctor.name} onChange={handleChange} required />
            </label>
            <label>
                Specialization:
                <select name="specialization" value={doctor.specialization} onChange={handleChange} required>
                    <option value="">Select </option>
                    {specializations.map((spec, idx) => (
                        <option key={idx} value={spec}>{spec}</option>
                    ))}
                </select>
            </label>
            <label>
                Phone:
                <input type="tel" name="phone" value={doctor.phone} onChange={handleChange} required />
            </label>
            <label>
                Email:
                <input type="email" name="email" value={doctor.email} onChange={handleChange} required />
            </label>
            <button type="submit">{isEdit ? 'Update Doctor' : 'Add Doctor'}</button>
            {isEdit && (
                <button type="button" onClick={onCancel} style={{ marginLeft: '8px', background: '#888', color: '#fff' }}>Cancel</button>
            )}
        </form>
    );
};

export default DoctorEntry;
