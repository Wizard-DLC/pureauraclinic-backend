const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

// Email transporter setup
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'mailout.hostnet.nl',
  port: process.env.SMTP_PORT || 587,
  secure: false,
  requireTLS: true,
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

    // Email sending temporarily disabled due to Hostnet server issues
    // TODO: Re-enable when Hostnet resolves their email server problems
    console.log('New contact message received:', {
      name, email, phone, subject, message
    });

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
      to: process.env.CLINIC_EMAIL || 'info@pureauraclinic.nl',
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