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

    // Email sending temporarily disabled due to Hostnet server issues
    // TODO: Re-enable when Hostnet resolves their email server problems
    console.log('New booking created:', {
      name, email, phone, service, date, time, message
    });

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