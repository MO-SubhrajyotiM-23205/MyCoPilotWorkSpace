import emailjs from '@emailjs/browser';

const EMAIL_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAIL_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAIL_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export const emailService = {
  init: () => {
    if (EMAIL_PUBLIC_KEY) {
      emailjs.init(EMAIL_PUBLIC_KEY);
    }
  },

  sendEmail: async (templateParams) => {
    try {
      if (!EMAIL_SERVICE_ID || !EMAIL_TEMPLATE_ID) {
        throw new Error('Email service not configured');
      }

      const response = await emailjs.send(
        EMAIL_SERVICE_ID,
        EMAIL_TEMPLATE_ID,
        templateParams
      );

      return { success: true, response };
    } catch (error) {
      console.error('Email sending failed:', error);
      return { success: false, error: error.message };
    }
  },

  sendContactForm: async (formData) => {
    return emailService.sendEmail({
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message,
      to_email: 'admin@example.com'
    });
  }
};

// Initialize on import
emailService.init();