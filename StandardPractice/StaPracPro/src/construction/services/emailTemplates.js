// Email Templates Configuration
export const EMAIL_TEMPLATES = {
  WELCOME: 'welcome',
  PASSWORD_RESET: 'password_reset',
  NOTIFICATION: 'notification',
  CONTACT_FORM: 'contact_form',
  INVOICE: 'invoice',
  REMINDER: 'reminder'
};

export const emailTemplates = {
  [EMAIL_TEMPLATES.WELCOME]: {
    subject: 'Welcome to {{companyName}}',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Welcome {{userName}}!</h2>
        <p>Thank you for joining {{companyName}}. We're excited to have you on board.</p>
        <p>Your account has been successfully created with email: <strong>{{userEmail}}</strong></p>
        <div style="margin: 20px 0; padding: 15px; background-color: #f5f5f5; border-radius: 5px;">
          <p><strong>Next Steps:</strong></p>
          <ul>
            <li>Complete your profile setup</li>
            <li>Explore our features</li>
            <li>Contact support if you need help</li>
          </ul>
        </div>
        <p>Best regards,<br>{{senderName}}</p>
      </div>
    `,
    text: 'Welcome {{userName}}! Thank you for joining {{companyName}}.'
  },

  [EMAIL_TEMPLATES.PASSWORD_RESET]: {
    subject: 'Password Reset Request',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Password Reset Request</h2>
        <p>Hello {{userName}},</p>
        <p>We received a request to reset your password. Click the button below to reset it:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="{{resetLink}}" style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">Reset Password</a>
        </div>
        <p>This link will expire in {{expiryTime}} hours.</p>
        <p>If you didn't request this, please ignore this email.</p>
        <p>Best regards,<br>{{senderName}}</p>
      </div>
    `,
    text: 'Password reset requested. Visit: {{resetLink}}'
  },

  [EMAIL_TEMPLATES.NOTIFICATION]: {
    subject: '{{subject}}',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">{{title}}</h2>
        <p>Hello {{userName}},</p>
        <div style="margin: 20px 0;">
          {{content}}
        </div>
        <p>Best regards,<br>{{senderName}}</p>
      </div>
    `,
    text: '{{title}} - {{content}}'
  },

  [EMAIL_TEMPLATES.CONTACT_FORM]: {
    subject: 'New Contact Form Submission',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">New Contact Form Submission</h2>
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <p><strong>Name:</strong> {{fromName}}</p>
          <p><strong>Email:</strong> {{fromEmail}}</p>
          <p><strong>Phone:</strong> {{phone}}</p>
          <p><strong>Subject:</strong> {{subject}}</p>
          <p><strong>Message:</strong></p>
          <div style="background-color: white; padding: 15px; border-left: 4px solid #007bff; margin-top: 10px;">
            {{message}}
          </div>
        </div>
        <p>Submitted on: {{submissionDate}}</p>
      </div>
    `,
    text: 'New contact form submission from {{fromName}} ({{fromEmail}}): {{message}}'
  },

  [EMAIL_TEMPLATES.INVOICE]: {
    subject: 'Invoice #{{invoiceNumber}} - {{companyName}}',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Invoice #{{invoiceNumber}}</h2>
        <p>Dear {{customerName}},</p>
        <p>Please find your invoice details below:</p>
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <p><strong>Invoice Date:</strong> {{invoiceDate}}</p>
          <p><strong>Due Date:</strong> {{dueDate}}</p>
          <p><strong>Amount:</strong> {{currency}} {{amount}}</p>
        </div>
        <p>{{paymentInstructions}}</p>
        <p>Thank you for your business!</p>
        <p>Best regards,<br>{{senderName}}</p>
      </div>
    `,
    text: 'Invoice #{{invoiceNumber}} for {{amount}} {{currency}}. Due: {{dueDate}}'
  },

  [EMAIL_TEMPLATES.REMINDER]: {
    subject: 'Reminder: {{reminderTitle}}',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #ff6b35;">Reminder: {{reminderTitle}}</h2>
        <p>Hello {{userName}},</p>
        <p>This is a friendly reminder about:</p>
        <div style="background-color: #fff3cd; padding: 15px; border-left: 4px solid #ff6b35; margin: 20px 0;">
          {{reminderContent}}
        </div>
        <p><strong>Due Date:</strong> {{dueDate}}</p>
        <p>Please take action at your earliest convenience.</p>
        <p>Best regards,<br>{{senderName}}</p>
      </div>
    `,
    text: 'Reminder: {{reminderTitle}} - {{reminderContent}}. Due: {{dueDate}}'
  }
};

// Template processing utility
export const processTemplate = (template, variables) => {
  let processedHtml = template.html;
  let processedText = template.text;
  let processedSubject = template.subject;

  // Replace variables in all template parts
  Object.keys(variables).forEach(key => {
    const regex = new RegExp(`{{${key}}}`, 'g');
    const value = variables[key] || '';
    
    processedHtml = processedHtml.replace(regex, value);
    processedText = processedText.replace(regex, value);
    processedSubject = processedSubject.replace(regex, value);
  });

  return {
    subject: processedSubject,
    html: processedHtml,
    text: processedText
  };
};