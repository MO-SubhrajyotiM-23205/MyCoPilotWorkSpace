import React, { useState } from 'react';
import { emailService, EMAIL_TEMPLATES } from '../../services/emailService';

const EmailTestForm = () => {
  const [formData, setFormData] = useState({
    templateType: EMAIL_TEMPLATES.WELCOME,
    recipientEmail: '',
    userName: '',
    customVariables: ''
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      let variables = { userName: formData.userName };
      
      // Parse custom variables if provided
      if (formData.customVariables) {
        try {
          const customVars = JSON.parse(formData.customVariables);
          variables = { ...variables, ...customVars };
        } catch (error) {
          setResult({ success: false, error: 'Invalid JSON in custom variables' });
          setLoading(false);
          return;
        }
      }

      const response = await emailService.sendTemplatedEmail(
        formData.templateType,
        formData.recipientEmail,
        variables
      );

      setResult(response);
    } catch (error) {
      setResult({ success: false, error: error.message });
    } finally {
      setLoading(false);
    }
  };

  const testSpecificEmails = async (type) => {
    setLoading(true);
    setResult(null);

    try {
      let response;
      const email = formData.recipientEmail || 'test@example.com';
      const name = formData.userName || 'Test User';

      switch (type) {
        case 'welcome':
          response = await emailService.sendWelcomeEmail(email, name);
          break;
        case 'passwordReset':
          response = await emailService.sendPasswordResetEmail(
            email, 
            name, 
            'https://example.com/reset?token=abc123'
          );
          break;
        case 'notification':
          response = await emailService.sendNotificationEmail(
            email, 
            name, 
            'System Maintenance', 
            'Our system will be under maintenance from 2 AM to 4 AM tomorrow.'
          );
          break;
        default:
          throw new Error('Unknown email type');
      }

      setResult(response);
    } catch (error) {
      setResult({ success: false, error: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="email-test-form" style={{ maxWidth: '600px', margin: '20px auto', padding: '20px' }}>
      <h2>Email Service Test</h2>
      
      <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '5px' }}>
        <h4>SMTP Configuration</h4>
        <pre>{JSON.stringify(emailService.getConfig(), null, 2)}</pre>
      </div>

      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <div style={{ marginBottom: '15px' }}>
          <label>Template Type:</label>
          <select
            name="templateType"
            value={formData.templateType}
            onChange={handleInputChange}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          >
            {Object.entries(EMAIL_TEMPLATES).map(([key, value]) => (
              <option key={key} value={value}>{key}</option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Recipient Email:</label>
          <input
            type="email"
            name="recipientEmail"
            value={formData.recipientEmail}
            onChange={handleInputChange}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>User Name:</label>
          <input
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleInputChange}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Custom Variables (JSON):</label>
          <textarea
            name="customVariables"
            value={formData.customVariables}
            onChange={handleInputChange}
            placeholder='{"resetLink": "https://example.com/reset", "expiryTime": "24"}'
            rows="3"
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          style={{ 
            padding: '10px 20px', 
            backgroundColor: '#007bff', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Sending...' : 'Send Email'}
        </button>
      </form>

      <div style={{ marginBottom: '20px' }}>
        <h4>Quick Test Buttons</h4>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button 
            onClick={() => testSpecificEmails('welcome')}
            disabled={loading}
            style={{ padding: '8px 16px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '3px' }}
          >
            Test Welcome
          </button>
          <button 
            onClick={() => testSpecificEmails('passwordReset')}
            disabled={loading}
            style={{ padding: '8px 16px', backgroundColor: '#ffc107', color: 'black', border: 'none', borderRadius: '3px' }}
          >
            Test Password Reset
          </button>
          <button 
            onClick={() => testSpecificEmails('notification')}
            disabled={loading}
            style={{ padding: '8px 16px', backgroundColor: '#17a2b8', color: 'white', border: 'none', borderRadius: '3px' }}
          >
            Test Notification
          </button>
        </div>
      </div>

      {result && (
        <div style={{ 
          padding: '15px', 
          borderRadius: '5px',
          backgroundColor: result.success ? '#d4edda' : '#f8d7da',
          border: `1px solid ${result.success ? '#c3e6cb' : '#f5c6cb'}`,
          color: result.success ? '#155724' : '#721c24'
        }}>
          <h4>{result.success ? 'Success!' : 'Error!'}</h4>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default EmailTestForm;