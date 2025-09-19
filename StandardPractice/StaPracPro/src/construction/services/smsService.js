// SMS Service using Twilio or AWS SNS
// Note: This requires backend implementation for security

const SMS_API_ENDPOINT = import.meta.env.VITE_SMS_API_URL || '/api/sms';

export const smsService = {
  sendSMS: async (phoneNumber, message) => {
    try {
      const response = await fetch(SMS_API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({
          to: phoneNumber,
          message: message
        })
      });

      if (!response.ok) {
        throw new Error('SMS sending failed');
      }

      const result = await response.json();
      return { success: true, result };
    } catch (error) {
      console.error('SMS sending failed:', error);
      return { success: false, error: error.message };
    }
  },

  sendOTP: async (phoneNumber) => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    const message = `Your OTP is: ${otp}. Valid for 5 minutes.`;
    
    const result = await smsService.sendSMS(phoneNumber, message);
    
    if (result.success) {
      // Store OTP temporarily (in real app, this should be backend)
      sessionStorage.setItem(`otp_${phoneNumber}`, JSON.stringify({
        otp,
        timestamp: Date.now()
      }));
    }
    
    return result;
  },

  verifyOTP: (phoneNumber, enteredOTP) => {
    const stored = sessionStorage.getItem(`otp_${phoneNumber}`);
    if (!stored) return false;

    const { otp, timestamp } = JSON.parse(stored);
    const isExpired = Date.now() - timestamp > 300000; // 5 minutes

    if (isExpired) {
      sessionStorage.removeItem(`otp_${phoneNumber}`);
      return false;
    }

    if (otp.toString() === enteredOTP.toString()) {
      sessionStorage.removeItem(`otp_${phoneNumber}`);
      return true;
    }

    return false;
  }
};