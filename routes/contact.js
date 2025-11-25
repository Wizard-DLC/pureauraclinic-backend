const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

// Email transporter setup
const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// POST /api/contact - Send contact form email
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message, phone } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: ['name', 'email', 'message']
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: 'Invalid email format'
      });
    }

    // Send email to clinic
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.CLINIC_EMAIL || 'info@pureaura.clinic',
      subject: subject || `Contact Form: Message from ${name}`,
      html: `
        <h2>New Contact Form Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
        <p><strong>Subject:</strong> ${subject || 'General Inquiry'}</p>
        <br>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <br>
        <p><em>Sent via Pure Aura Clinic website contact form</em></p>
      `,
      replyTo: email // Allow direct reply to customer
    };

    await transporter.sendMail(mailOptions);

    // Send auto-reply to customer
    const autoReplyOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: 'Thank you for contacting Pure Aura Clinic',
      html: `
        <h2>Thank You for Your Message</h2>
        <p>Dear ${name},</p>
        <p>Thank you for contacting Pure Aura Clinic. We have received your message and will respond within 24 hours.</p>
        <br>
        <p><strong>Your message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <br>
        <p>If you need immediate assistance, please call us at:</p>
        <p>📞 +31 6 84664822</p>
        <p>📍 Schoutstraat 29, 1315EV Almere Stad</p>
        <br>
        <p>Best regards,<br>Pure Aura Clinic Team</p>
      `,
    };

    await transporter.sendMail(autoReplyOptions);

    res.json({
      success: true,
      message: 'Message sent successfully! We will contact you within 24 hours.'
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      error: 'Failed to send message',
      message: error.message
    });
  }
});

// POST /api/contact/newsletter - Newsletter signup
router.post('/newsletter', async (req, res) => {
  try {
    const { email, name } = req.body;

    if (!email) {
      return res.status(400).json({
        error: 'Email is required'
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: 'Invalid email format'
      });
    }

    // Send notification to clinic
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.CLINIC_EMAIL || 'info@pureaura.clinic',
      subject: 'New Newsletter Subscription',
      html: `
        <h2>New Newsletter Subscription</h2>
        <p><strong>Email:</strong> ${email}</p>
        ${name ? `<p><strong>Name:</strong> ${name}</p>` : ''}
        <p><em>Subscribed via Pure Aura Clinic website</em></p>
      `,
    };

    await transporter.sendMail(mailOptions);

    // Send welcome email to subscriber
    const welcomeOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: 'Welcome to Pure Aura Clinic Newsletter',
      html: `
        <h2>Welcome to Our Newsletter!</h2>
        ${name ? `<p>Dear ${name},</p>` : '<p>Hello!</p>'}
        <p>Thank you for subscribing to the Pure Aura Clinic newsletter.</p>
        <p>You'll receive updates about:</p>
        <ul>
          <li>✨ New treatments and services</li>
          <li>💄 Beauty tips and skincare advice</li>
          <li>🎉 Special offers and promotions</li>
          <li>📅 Upcoming events and workshops</li>
        </ul>
        <br>
        <p>Visit us at:</p>
        <p>📍 Schoutstraat 29, 1315EV Almere Stad</p>
        <p>📞 +31 6 84664822</p>
        <br>
        <p>Best regards,<br>Pure Aura Clinic Team</p>
      `,
    };

    await transporter.sendMail(welcomeOptions);

    res.json({
      success: true,
      message: 'Successfully subscribed to newsletter!'
    });

  } catch (error) {
    console.error('Newsletter signup error:', error);
    res.status(500).json({
      error: 'Failed to subscribe to newsletter',
      message: error.message
    });
  }
});

module.exports = router;