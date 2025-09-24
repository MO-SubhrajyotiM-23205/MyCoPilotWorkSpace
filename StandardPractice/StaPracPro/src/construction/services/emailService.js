import { emailTemplates, EMAIL_TEMPLATES, processTemplate } from './emailTemplates.js';

// SMTP Configuration
const SMTP_CONFIG = {
  host: import.meta.env.VITE_SMTP_HOST || '192.168.122.21',
  port: parseInt(import.meta.env.VITE_SMTP_PORT) || 25,
  username: import.meta.env.VITE_SMTP_USERNAME || '',
  password: import.meta.env.VITE_SMTP_PASSWORD || '',
  defaultSender: {
    email: import.meta.env.VITE_DEFAULT_SENDER_EMAIL || 'noreply@motilaloswal.com',
    name: import.meta.env.VITE_DEFAULT_SENDER_NAME || 'AMC Department'
  }
};

export const emailService = {
  // Send email using backend API (since SMTP requires server-side implementation)
  sendEmail: async (emailData) => {
    try {
      const response = await fetch('/api/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...emailData,
          smtpConfig: SMTP_CONFIG
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return { success: true, data: result };
    } catch (error) {
      console.error('Email sending failed:', error);
      return { success: false, error: error.message };
    }
  },

  // Send templated email
  sendTemplatedEmail: async (templateType, recipientEmail, variables = {}) => {
    try {
      const template = emailTemplates[templateType];
      if (!template) {
        throw new Error(`Template '${templateType}' not found`);
      }

      // Add default variables
      const templateVariables = {
        senderName: SMTP_CONFIG.defaultSender.name,
        companyName: 'Motilal Oswal',
        ...variables
      };

      const processedTemplate = processTemplate(template, templateVariables);

      const emailData = {
        to: recipientEmail,
        from: {
          email: SMTP_CONFIG.defaultSender.email,
          name: SMTP_CONFIG.defaultSender.name
        },
        subject: processedTemplate.subject,
        html: processedTemplate.html,
        text: processedTemplate.text
      };

      return await this.sendEmail(emailData);
    } catch (error) {
      console.error('Templated email sending failed:', error);
      return { success: false, error: error.message };
    }
  },

  // Send welcome email
  sendWelcomeEmail: async (userEmail, userName) => {
    return await emailService.sendTemplatedEmail(
      EMAIL_TEMPLATES.WELCOME,
      userEmail,
      { userName, userEmail }
    );
  },

  // Send password reset email
  sendPasswordResetEmail: async (userEmail, userName, resetLink, expiryHours = 24) => {
    return await emailService.sendTemplatedEmail(
      EMAIL_TEMPLATES.PASSWORD_RESET,
      userEmail,
      { userName, resetLink, expiryTime: expiryHours }
    );
  },

  // Send notification email
  sendNotificationEmail: async (userEmail, userName, title, content, subject = null) => {
    return await emailService.sendTemplatedEmail(
      EMAIL_TEMPLATES.NOTIFICATION,
      userEmail,
      { userName, title, content, subject: subject || title }
    );
  },

  // Send contact form email
  sendContactFormEmail: async (adminEmail, formData) => {
    return await emailService.sendTemplatedEmail(
      EMAIL_TEMPLATES.CONTACT_FORM,
      adminEmail,
      {
        fromName: formData.name,
        fromEmail: formData.email,
        phone: formData.phone || 'Not provided',
        subject: formData.subject,
        message: formData.message,
        submissionDate: new Date().toLocaleString()
      }
    );
  },

  // Send invoice email
  sendInvoiceEmail: async (customerEmail, invoiceData) => {
    return await emailService.sendTemplatedEmail(
      EMAIL_TEMPLATES.INVOICE,
      customerEmail,
      {
        customerName: invoiceData.customerName,
        invoiceNumber: invoiceData.invoiceNumber,
        invoiceDate: invoiceData.invoiceDate,
        dueDate: invoiceData.dueDate,
        amount: invoiceData.amount,
        currency: invoiceData.currency || 'INR',
        paymentInstructions: invoiceData.paymentInstructions || 'Please pay within the due date.'
      }
    );
  },

  // Send reminder email
  sendReminderEmail: async (userEmail, userName, reminderData) => {
    return await emailService.sendTemplatedEmail(
      EMAIL_TEMPLATES.REMINDER,
      userEmail,
      {
        userName,
        reminderTitle: reminderData.title,
        reminderContent: reminderData.content,
        dueDate: reminderData.dueDate
      }
    );
  },

  // Get SMTP configuration (for debugging)
  getConfig: () => {
    return {
      host: SMTP_CONFIG.host,
      port: SMTP_CONFIG.port,
      defaultSender: SMTP_CONFIG.defaultSender,
      hasCredentials: !!(SMTP_CONFIG.username && SMTP_CONFIG.password)
    };
  }
};

export { EMAIL_TEMPLATES };