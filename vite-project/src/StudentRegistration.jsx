import { useState } from 'react'
import './StudentRegistration.css'

function StudentRegistration() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    fatherName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    currentAddress: '',
    permanentAddress: '',
    sameAddress: false,
    course: '',
    transportMode: '',
    emergencyContact: '',
    emergencyPhone: '',
    documents: []
  })

  const [errors, setErrors] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showResetModal, setShowResetModal] = useState(false)

  // Indian Email Validation Function
  const validateIndianEmail = (email) => {
    // Common Indian email domains
    const indianDomains = [
      // Government and Educational
      'gov.in', 'nic.in', 'ac.in', 'edu.in', 'res.in', 'co.in',
      // Popular Indian Email Providers
      'rediffmail.com', 'rediff.com', 'sify.com', 'in.com',
      // Global providers commonly used in India
      'gmail.com', 'yahoo.com', 'yahoo.in', 'outlook.com', 'hotmail.com',
      'live.com', 'msn.com', 'icloud.com', 'me.com',
      // Business and Organizations
      'org.in', 'net.in', 'ind.in', 'firm.in', 'gen.in', 'mil.in',
      // Popular Indian Companies
      'tataindicom.com', 'airtelindia.com', 'relianceada.com',
      'bsnl.in', 'sancharnet.in', 'vsnl.com', 'del.net.in',
      // Educational Institutions
      'iit.ac.in', 'iisc.ac.in', 'nit.ac.in', 'bits-pilani.ac.in',
      'dtu.ac.in', 'du.ac.in', 'jnu.ac.in', 'bhu.ac.in',
      // State-specific domains
      'mah.nic.in', 'up.nic.in', 'kar.nic.in', 'tn.nic.in',
      'wb.nic.in', 'raj.nic.in', 'guj.nic.in', 'mp.nic.in'
    ]
    
    // Basic email format validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    
    if (!emailRegex.test(email)) {
      return false
    }
    
    // Extract domain from email
    const domain = email.toLowerCase().split('@')[1]
    
    // Check if domain is in the Indian domains list
    return indianDomains.includes(domain)
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    
    if (type === 'checkbox' && name === 'sameAddress') {
      setFormData(prev => ({
        ...prev,
        [name]: checked,
        permanentAddress: checked ? prev.currentAddress : prev.permanentAddress
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
      
      // If current address changes and sameAddress is checked, update permanent address
      if (name === 'currentAddress' && formData.sameAddress) {
        setFormData(prev => ({
          ...prev,
          permanentAddress: value
        }))
      }
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files)
    const maxSize = 5 * 1024 * 1024 // 5MB limit per file
    const maxFiles = 5 // Maximum 5 files
    
    // Check total number of files
    if (formData.documents.length + files.length > maxFiles) {
      setErrors(prev => ({
        ...prev,
        documents: `Maximum ${maxFiles} files allowed`
      }))
      return
    }

    const validFiles = []
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png']
    
    for (const file of files) {
      // Check file size
      if (file.size > maxSize) {
        setErrors(prev => ({
          ...prev,
          documents: `File "${file.name}" is too large. Max size is 5MB per file.`
        }))
        continue
      }
      
      // Check file type
      if (!allowedTypes.includes(file.type)) {
        setErrors(prev => ({
          ...prev,
          documents: `File "${file.name}" is not allowed. Only PDF, JPG, JPEG, and PNG files are accepted.`
        }))
        continue
      }

      // Check for duplicate files
      const isDuplicate = formData.documents.some(existingFile => 
        existingFile.name === file.name && existingFile.size === file.size
      )
      
      if (isDuplicate) {
        setErrors(prev => ({
          ...prev,
          documents: `File "${file.name}" is already uploaded.`
        }))
        continue
      }
      
      validFiles.push(file)
    }
    
    if (validFiles.length > 0) {
      setFormData(prev => ({
        ...prev,
        documents: [...prev.documents, ...validFiles]
      }))
      
      // Clear error if files are valid
      if (errors.documents) {
        setErrors(prev => ({
          ...prev,
          documents: ''
        }))
      }
    }
    
    // Reset file input
    e.target.value = ''
  }

  const handleFileDelete = (fileIndex) => {
    setFormData(prev => ({
      ...prev,
      documents: prev.documents.filter((_, index) => index !== fileIndex)
    }))
    
    // Clear error if files are removed
    if (errors.documents) {
      setErrors(prev => ({
        ...prev,
        documents: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required'
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required'
    }

    if (!formData.fatherName.trim()) {
      newErrors.fatherName = 'Father name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!validateIndianEmail(formData.email)) {
      newErrors.email = 'Please enter a valid Indian email address (e.g., example@gmail.com, student@ac.in, user@rediffmail.com)'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Phone number must be 10 digits'
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required'
    }

    if (!formData.gender) {
      newErrors.gender = 'Gender is required'
    }

    if (!formData.currentAddress.trim()) {
      newErrors.currentAddress = 'Current address is required'
    }

    if (!formData.permanentAddress.trim()) {
      newErrors.permanentAddress = 'Permanent address is required'
    }

    if (!formData.course) {
      newErrors.course = 'Course selection is required'
    }

    if (!formData.transportMode) {
      newErrors.transportMode = 'Transport mode is required'
    }

    if (!formData.emergencyContact.trim()) {
      newErrors.emergencyContact = 'Emergency contact name is required'
    }

    if (!formData.emergencyPhone.trim()) {
      newErrors.emergencyPhone = 'Emergency contact phone is required'
    }

    if (formData.documents.length === 0) {
      newErrors.documents = 'At least one document upload is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validateForm()) {
      setIsSubmitted(true)
      console.log('Student Registration Data:', formData)
      // Here you would typically send the data to a server
      alert('Registration submitted successfully!')
    }
  }

  const handleReset = () => {
    setShowResetModal(true)
  }

  const confirmReset = () => {
    setFormData({
      firstName: '',
      lastName: '',
      fatherName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      gender: '',
      currentAddress: '',
      permanentAddress: '',
      sameAddress: false,
      course: '',
      transportMode: '',
      emergencyContact: '',
      emergencyPhone: '',
      documents: []
    })
    setErrors({})
    setIsSubmitted(false)
    
    // Reset file input
    const fileInput = document.getElementById('documents')
    if (fileInput) {
      fileInput.value = ''
    }
    
    setShowResetModal(false)
  }

  const cancelReset = () => {
    setShowResetModal(false)
  }

  // Custom Reset Confirmation Modal Component
  const ResetConfirmationModal = () => {
    if (!showResetModal) return null

    return (
      <div className="modal-overlay" onClick={cancelReset}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <div className="modal-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 9V13M12 17H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
                      stroke="#d97706" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3>⚠️ Confirm Reset Action</h3>
            <button className="modal-close" onClick={cancelReset}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          <div className="modal-body">
            <p className="modal-message">
              🔄 Reset Complete Form Data?
            </p>
            <p className="modal-warning">
              <span style={{fontSize: '1.1em'}}>⚡</span> This action will permanently delete all entered information, uploaded files, and form progress. Once confirmed, this operation cannot be undone or recovered.
            </p>
          </div>
          <div className="modal-footer">
            <button className="btn-cancel" onClick={cancelReset}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 9L9 15M9 9L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Keep Data
            </button>
            <button className="btn-confirm-reset" onClick={confirmReset}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 12C3 13.1819 3.16394 14.3522 3.4851 15.4442C3.8062 16.5361 4.30054 17.5282 4.92893 18.364C5.55732 19.1997 6.34587 19.8625 7.23975 20.3149C8.13363 20.7672 9.11091 21 10.1 21C12.0869 21 13.9761 20.2098 15.364 18.8219C16.7518 17.4341 17.542 15.5449 17.542 13.558C17.542 11.5711 16.7518 9.68186 15.364 8.29401C13.9761 6.90615 12.0869 6.11597 10.1 6.11597" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7 9L10 6L7 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Reset Form
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (isSubmitted) {
    return (
      <div className="registration-success">
        <h2>Registration Successful!</h2>
        <div className="student-info">
          <p><strong>Name:</strong> {formData.firstName} {formData.lastName}</p>
          <p><strong>Father's Name:</strong> {formData.fatherName}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>Course:</strong> {formData.course}</p>
          <p><strong>Transport Mode:</strong> {formData.transportMode.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</p>
          <p><strong>Current Address:</strong> {formData.currentAddress}</p>
          <p><strong>Permanent Address:</strong> {formData.permanentAddress}</p>
          <p><strong>Documents Uploaded:</strong> {formData.documents.length} file(s)</p>
          {formData.documents.length > 0 && (
            <div className="uploaded-files-summary">
              <strong>Files:</strong>
              <ul>
                {formData.documents.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <button onClick={handleReset} className="btn-secondary">
          ➕ Register Another Student
        </button>
      </div>
    )
  }

  return (
    <div className="registration-container">
      <h2>Student Registration Form</h2>
      <form onSubmit={handleSubmit} className="registration-form">
        
        <div className="form-section">
          <h3>Personal Information</h3>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name *</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={errors.firstName ? 'error' : ''}
              />
              {errors.firstName && <span className="error-message">{errors.firstName}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name *</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={errors.lastName ? 'error' : ''}
              />
              {errors.lastName && <span className="error-message">{errors.lastName}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="fatherName">Father's Name *</label>
              <input
                type="text"
                id="fatherName"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleChange}
                placeholder="Enter father's full name"
                className={errors.fatherName ? 'error' : ''}
              />
              {errors.fatherName && <span className="error-message">{errors.fatherName}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="dateOfBirth">Date of Birth *</label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className={errors.dateOfBirth ? 'error' : ''}
              />
              {errors.dateOfBirth && <span className="error-message">{errors.dateOfBirth}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="gender">Gender *</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className={errors.gender ? 'error' : ''}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
              {errors.gender && <span className="error-message">{errors.gender}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="course">Course *</label>
              <select
                id="course"
                name="course"
                value={formData.course}
                onChange={handleChange}
                className={errors.course ? 'error' : ''}
              >
                <option value="">Select Course</option>
                <option value="computer-science">Computer Science</option>
                <option value="business-administration">Business Administration</option>
                <option value="engineering">Engineering</option>
                <option value="medicine">Medicine</option>
                <option value="arts">Arts</option>
                <option value="mathematics">Mathematics</option>
                <option value="physics">Physics</option>
                <option value="chemistry">Chemistry</option>
                <option value="biology">Biology</option>
              </select>
              {errors.course && <span className="error-message">{errors.course}</span>}
            </div>
          </div>

          <div className="form-group full-width">
            <label htmlFor="transportMode">Transport Mode *</label>
            <select
              id="transportMode"
              name="transportMode"
              value={formData.transportMode}
              onChange={handleChange}
              className={errors.transportMode ? 'error' : ''}
            >
              <option value="">Select Transport Mode</option>
              <option value="own-vehicle">🚗 Own Vehicle (Car/Motorcycle)</option>
              <option value="public-bus">🚌 Public Bus</option>
              <option value="school-bus">🚍 School/College Bus</option>
              <option value="metro-train">🚇 Metro/Train</option>
              <option value="bicycle">🚲 Bicycle</option>
              <option value="walking">🚶 Walking</option>
              <option value="carpool">🚙 Carpool/Rideshare</option>
              <option value="taxi-auto">🚕 Taxi/Auto Rickshaw</option>
              <option value="hostel-resident">🏠 Hostel Resident (On Campus)</option>
              <option value="other">🔄 Other</option>
            </select>
            {errors.transportMode && <span className="error-message">{errors.transportMode}</span>}
            <small className="field-hint">Select your primary mode of transportation to reach the institution</small>
          </div>
        </div>

        <div className="form-section">
          <h3>Contact Information</h3>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Email Address (Indian Format Only) *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="student@gmail.com or user@ac.in"
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
              <small className="field-hint">
                📧 Accepted domains: gmail.com, yahoo.com, rediffmail.com, ac.in, gov.in, edu.in, co.in, etc.
              </small>
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="(123) 456-7890"
                className={errors.phone ? 'error' : ''}
              />
              {errors.phone && <span className="error-message">{errors.phone}</span>}
            </div>
          </div>

          <div className="form-group full-width">
            <label htmlFor="currentAddress">Current Address *</label>
            <textarea
              id="currentAddress"
              name="currentAddress"
              value={formData.currentAddress}
              onChange={handleChange}
              rows="3"
              placeholder="Enter your current address"
              className={errors.currentAddress ? 'error' : ''}
            />
            {errors.currentAddress && <span className="error-message">{errors.currentAddress}</span>}
          </div>

          <div className="form-group full-width">
            <div className="checkbox-container">
              <input
                type="checkbox"
                id="sameAddress"
                name="sameAddress"
                checked={formData.sameAddress}
                onChange={handleChange}
              />
              <label htmlFor="sameAddress" className="checkbox-label">
                Permanent address is same as current address
              </label>
            </div>
          </div>

          <div className="form-group full-width">
            <label htmlFor="permanentAddress">Permanent Address *</label>
            <textarea
              id="permanentAddress"
              name="permanentAddress"
              value={formData.permanentAddress}
              onChange={handleChange}
              rows="3"
              placeholder="Enter your permanent address"
              className={errors.permanentAddress ? 'error' : ''}
              disabled={formData.sameAddress}
            />
            {errors.permanentAddress && <span className="error-message">{errors.permanentAddress}</span>}
          </div>
        </div>

        <div className="form-section">
          <h3>Emergency Contact & Documents</h3>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="emergencyContact">Emergency Contact Name *</label>
              <input
                type="text"
                id="emergencyContact"
                name="emergencyContact"
                value={formData.emergencyContact}
                onChange={handleChange}
                className={errors.emergencyContact ? 'error' : ''}
              />
              {errors.emergencyContact && <span className="error-message">{errors.emergencyContact}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="emergencyPhone">Emergency Contact Phone *</label>
              <input
                type="tel"
                id="emergencyPhone"
                name="emergencyPhone"
                value={formData.emergencyPhone}
                onChange={handleChange}
                placeholder="(123) 456-7890"
                className={errors.emergencyPhone ? 'error' : ''}
              />
              {errors.emergencyPhone && <span className="error-message">{errors.emergencyPhone}</span>}
            </div>
          </div>

          <div className="form-group full-width">
            <label htmlFor="documents">Upload Documents *</label>
            <div className="file-upload-container">
              <input
                type="file"
                id="documents"
                name="documents"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                multiple
                className={errors.documents ? 'error' : ''}
              />
              <div className="file-upload-info">
                <small>Upload certificates, diplomas, or other documents (PDF, JPG, JPEG, PNG - Max 5MB per file, 5 files max)</small>
                
                {formData.documents.length > 0 && (
                  <div className="uploaded-files">
                    <h4>Uploaded Files ({formData.documents.length}/5):</h4>
                    {formData.documents.map((file, index) => (
                      <div key={index} className="file-selected">
                        <div className="file-info">
                          <span className="file-icon">📄</span>
                          <span className="file-name">{file.name}</span>
                          <span className="file-size">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                        </div>
                        <button 
                          type="button" 
                          onClick={() => handleFileDelete(index)}
                          className="file-delete-btn"
                          title="Remove file"
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                
                {formData.documents.length === 0 && (
                  <div className="no-files-message">
                    <p>No files uploaded yet. Click "Choose Files" to select documents.</p>
                  </div>
                )}
                
                {formData.documents.length < 5 && (
                  <div className="upload-hint">
                    <small>💡 You can select multiple files at once or add them one by one.</small>
                  </div>
                )}
              </div>
            </div>
            {errors.documents && <span className="error-message">{errors.documents}</span>}
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-primary">
            Register Student
          </button>
          <button type="button" onClick={handleReset} className="btn-secondary">
            🔄 Reset Form
          </button>
        </div>
      </form>
      <ResetConfirmationModal />
    </div>
  )
}

export default StudentRegistration
