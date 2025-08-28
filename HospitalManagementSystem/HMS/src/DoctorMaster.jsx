import React, { useState, useEffect } from 'react';
import './DoctorMaster.css';
import DoctorEntry from './DoctorEntry';

const DoctorMaster = () => {

  const [message, setMessage] = useState('');
  const [doctorsList, setDoctorsList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  

  useEffect(() => {
    const storedDoctors = JSON.parse(localStorage.getItem('doctors')) || [];
    setDoctorsList(storedDoctors);
  }, []);


  const handleEdit = (idx) => {
    setEditIndex(idx);
  };


  const handleDelete = (idx) => {
    let doctors = [...doctorsList];
    doctors.splice(idx, 1);
    localStorage.setItem('doctors', JSON.stringify(doctors));
    setDoctorsList(doctors);
    setMessage('Doctor deleted successfully!');
    setTimeout(() => setMessage(''), 2000);
    if (editIndex === idx) {
      setEditIndex(null);
    }
  };

  return (
    <div className="doctor-master-container">
      <h2>Doctor Master</h2>
      <DoctorEntry
        isEdit={editIndex !== null}
        editIndex={editIndex}
        doctorsList={doctorsList}
        onCancel={() => setEditIndex(null)}
        onDoctorListChange={setDoctorsList}
        setMessage={setMessage}
        setEditIndex={setEditIndex}
      />
      {message && <div className="success-message">{message}</div>}

      <h3 style={{marginTop: '32px'}}>Doctors List</h3>
      {doctorsList.length === 0 ? (
        <div>No doctors added yet.</div>
      ) : (
        <table className="doctor-list-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctorsList.map((doc, idx) => (
              <tr key={idx}>
                <td>{doc.name + " (" + doc.specialization + ")"}</td>
                <td>{doc.phone}</td>
                <td>{doc.email}</td>
                <td>
                  <button type="button" onClick={() => handleEdit(idx)} style={{marginRight: '8px'}}>Edit</button>
                  <button type="button" onClick={() => handleDelete(idx)} style={{background: '#d32f2f', color: '#fff'}}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DoctorMaster;
