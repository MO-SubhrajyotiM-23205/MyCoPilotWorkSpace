import { useState } from 'react';

function StuReg() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple validation
    if (!formData.name || !formData.email || !formData.phone || !formData.course) {
      setError('All fields are required.');
      return;
    }
    // Email format validation
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Please enter a valid email address.');
      return;
    }
    // Phone number validation (simple)
    if (!/^\d{10}$/.test(formData.phone)) {
      setError('Please enter a valid 10-digit phone number.');
      return;
    }
    setError('');
    alert('Registration submitted successfully!');
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      course: ''
    });
  };

  // Styles
  const containerStyle = {
    maxWidth: '420px',
    margin: '40px auto',
    padding: '32px',
    background: '#fff',
    borderRadius: '14px',
    boxShadow: '0 6px 24px rgba(0,0,0,0.13)',
    fontFamily: 'Segoe UI, Arial, sans-serif'
  };

  const titleStyle = {
    textAlign: 'center',
    color: '#2d3748',
    marginBottom: '28px',
    fontSize: '26px',
    fontWeight: 700,
    letterSpacing: '1px'
  };

  const fieldGroupStyle = {
    marginBottom: '18px'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '7px',
    color: '#4a5568',
    fontSize: '15px',
    fontWeight: 500
  };

  const inputStyle = {
    width: '100%',
    padding: '11px 14px',
    border: '1.5px solid #cbd5e1',
    borderRadius: '7px',
    fontSize: '15px',
    transition: 'border-color 0.2s',
    outline: 'none',
    boxSizing: 'border-box'
  };

  const selectStyle = {
    ...inputStyle
  };

  const errorTextStyle = {
    color: '#e53e3e',
    fontSize: '13px',
    marginTop: '6px',
    marginBottom: '2px'
  };

  const buttonStyle = {
    width: '100%',
    padding: '13px',
    background: 'linear-gradient(90deg, #38b2ac 0%, #4299e1 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: '7px',
    fontSize: '16px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'background 0.2s'
  };

  return (
    <div style={containerStyle}>
      <div style={titleStyle}>Student Registration By CP</div>
      {error && <div style={errorTextStyle}>{error}</div>}
      <form onSubmit={handleSubmit} autoComplete="off">
        <div style={fieldGroupStyle}>
          <label style={labelStyle}>Name:</label>
          <input
            style={inputStyle}
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
        </div>
        <div style={fieldGroupStyle}>
          <label style={labelStyle}>Email:</label>
          <input
            style={inputStyle}
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>
        <div style={fieldGroupStyle}>
          <label style={labelStyle}>Phone:</label>
          <input
            style={inputStyle}
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="10-digit phone number"
            required
          />
        </div>
        <div style={fieldGroupStyle}>
          <label style={labelStyle}>Course:</label>
          <select
            style={selectStyle}
            name="course"
            value={formData.course}
            onChange={handleChange}
            required
          >
            <option value="">Select Course</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Engineering">Engineering</option>
            <option value="Business">Business</option>
            <option value="Arts">Arts</option>
            <option value="Science">Science</option>
          </select>
        </div>
        <button type="submit" style={buttonStyle}>Register</button>
      </form>
    </div>
  );
}

export default StuReg;