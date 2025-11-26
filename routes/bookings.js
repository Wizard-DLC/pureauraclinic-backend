const express = require('express');
const { PrismaClient } = require('@prisma/client');
const nodemailer = require('nodemailer');
const router = express.Router();

const prisma = new PrismaClient();

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

// POST /api/bookings - Create new booking
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, service, date, time, message } = req.body;

    // Validation
    if (!name || !email || !phone || !service || !date || !time) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: ['name', 'email', 'phone', 'service', 'date', 'time']
      });
    }

    // Create booking in database
    const booking = await prisma.booking.create({
      data: {
        customerName: name,
        customerEmail: email,
        customerPhone: phone,
        serviceName: service,
        appointmentDate: new Date(date),
        appointmentTime: time,
        message: message || '',
        status: 'PENDING'
      },
    });

    // Send email notification
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.CLINIC_EMAIL || 'info@pureauraclinic.nl',
      subject: `New Booking: ${name} - ${service}`,
      html: `
        <h2>New Appointment Booking</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Time:</strong> ${time}</p>
        <p><strong>Message:</strong> ${message}</p>
        <br>
        <p>Please contact the customer to confirm the appointment.</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    // Send confirmation email to customer
    const customerMailOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: 'Booking Confirmation - Pure Aura Clinic',
      html: `
        <h2>Appointment Booking Received</h2>
        <p>Dear ${name},</p>
        <p>Thank you for booking with Pure Aura Clinic. We have received your appointment request:</p>
        <ul>
          <li><strong>Service:</strong> ${service}</li>
          <li><strong>Date:</strong> ${date}</li>
          <li><strong>Time:</strong> ${time}</li>
        </ul>
        <p>We will contact you within 24 hours to confirm your appointment.</p>
        <p>If you have any questions, please call us at +31 6 84664822</p>
        <br>
        <p>Best regards,<br>Pure Aura Clinic Team</p>
      `,
    };

    await transporter.sendMail(customerMailOptions);

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      booking: {
        id: booking.id,
        customerName: booking.customerName,
        serviceName: booking.serviceName,
        appointmentDate: booking.appointmentDate,
        appointmentTime: booking.appointmentTime,
        status: booking.status
      }
    });

  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({
      error: 'Failed to create booking',
      message: error.message
    });
  }
});

// GET /api/bookings - Get all bookings (admin only - add auth later)
router.get('/', async (req, res) => {
  try {
    const bookings = await prisma.booking.findMany({
      orderBy: { createdAt: 'desc' }
    });

    res.json({
      success: true,
      bookings
    });
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({
      error: 'Failed to fetch bookings',
      message: error.message
    });
  }
});

module.exports = router;