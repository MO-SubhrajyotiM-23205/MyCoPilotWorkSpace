import { useState } from 'react'

function StudentRegistration() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: ''
  })

  const [errors, setErrors] = useState({})

  const validateName = (name) => {
    if (!name.trim()) return 'Name is required'
    if (name.length < 2) return 'Name must be at least 2 characters'
    if (!/^[a-zA-Z\s]+$/.test(name)) return 'Name can only contain letters and spaces'
    return ''
  }

  const validateEmail = (email) => {
    if (!email) return 'Email is required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Please enter a valid email'
    return ''
  }

  const validatePhone = (phone) => {
    if (!phone) return 'Phone is required'
    if (!/^\d{10}$/.test(phone.replace(/\D/g, ''))) return 'Phone must be 10 digits'
    return ''
  }

  const validateCourse = (course) => {
    if (!course) return 'Please select a course'
    return ''
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const newErrors = {
      name: validateName(formData.name),
      email: validateEmail(formData.email),
      phone: validatePhone(formData.phone),
      course: validateCourse(formData.course)
    }

    setErrors(newErrors)

    const hasErrors = Object.values(newErrors).some(error => error !== '')
    
    if (!hasErrors) {
      console.log('Student Registration:', formData)
      alert('Registration submitted successfully!')
      // Reset form
      setFormData({ name: '', email: '', phone: '', course: '' })
    }
  }

  const containerStyle = {
    maxWidth: '500px',
    margin: '20px auto',
    padding: '30px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif'
  }

  const titleStyle = {
    textAlign: 'center',
    color: '#333',
    marginBottom: '30px',
    fontSize: '28px',
    fontWeight: '600'
  }

  const fieldGroupStyle = {
    marginBottom: '20px'
  }

  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    color: '#555',
    fontSize: '14px',
    fontWeight: '500'
  }

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    border: '2px solid #e1e5e9',
    borderRadius: '8px',
    fontSize: '16px',
    transition: 'border-color 0.3s ease',
    outline: 'none',
    boxSizing: 'border-box'
  }

  const inputFocusStyle = {
    borderColor: '#4CAF50'
  }

  const errorInputStyle = {
    ...inputStyle,
    borderColor: '#f44336'
  }

  const errorTextStyle = {
    color: '#f44336',
    fontSize: '12px',
    marginTop: '5px',
    display: 'block'
  }

  const buttonStyle = {
    width: '100%',
    padding: '14px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    marginTop: '10px'
  }

  const buttonHoverStyle = {
    backgroundColor: '#45a049'
  }

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Student Registration By AQ</h2>
      <form onSubmit={handleSubmit}>
        <div style={fieldGroupStyle}>
          <label style={labelStyle}>Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={errors.name ? errorInputStyle : inputStyle}
            placeholder="Enter your full name"
          />
          {errors.name && <span style={errorTextStyle}>{errors.name}</span>}
        </div>
        
        <div style={fieldGroupStyle}>
          <label style={labelStyle}>Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={errors.email ? errorInputStyle : inputStyle}
            placeholder="Enter your email address"
          />
          {errors.email && <span style={errorTextStyle}>{errors.email}</span>}
        </div>
        
        <div style={fieldGroupStyle}>
          <label style={labelStyle}>Phone *</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            style={errors.phone ? errorInputStyle : inputStyle}
            placeholder="Enter 10-digit phone number"
          />
          {errors.phone && <span style={errorTextStyle}>{errors.phone}</span>}
        </div>
        
        <div style={fieldGroupStyle}>
          <label style={labelStyle}>Course *</label>
          <select
            name="course"
            value={formData.course}
            onChange={handleChange}
            style={errors.course ? errorInputStyle : inputStyle}
          >
            <option value="">Select Course</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Engineering">Engineering</option>
            <option value="Business">Business</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Physics">Physics</option>
          </select>
          {errors.course && <span style={errorTextStyle}>{errors.course}</span>}
        </div>
        
        <button 
          type="submit" 
          style={buttonStyle}
          onMouseOver={(e) => e.target.style.backgroundColor = '#45a049'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#4CAF50'}
        >
          Register Student
        </button>
      </form>
    </div>
  )
}

export default StudentRegistration