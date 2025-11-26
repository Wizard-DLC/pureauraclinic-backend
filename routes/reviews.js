const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();

const prisma = new PrismaClient();

// GET /api/reviews - Get approved reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await prisma.review.findMany({
      where: { 
        isApproved: true 
      },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        rating: true,
        title: true,
        content: true,
        createdAt: true
        // Don't include email for privacy
      }
    });

    res.json({
      success: true,
      reviews
    });
  } catch (error) {
    console.error('Get reviews error:', error);
    res.status(500).json({
      error: 'Failed to fetch reviews',
      message: error.message
    });
  }
});

// GET /api/reviews/featured - Get featured reviews
router.get('/featured', async (req, res) => {
  try {
    const reviews = await prisma.review.findMany({
      where: { 
        isApproved: true,
        rating: { gte: 4 } // 4+ star reviews
      },
      orderBy: { createdAt: 'desc' },
      take: 6, // Limit to 6 featured reviews
      select: {
        id: true,
        name: true,
        rating: true,
        title: true,
        content: true,
        createdAt: true
      }
    });

    res.json({
      success: true,
      reviews
    });
  } catch (error) {
    console.error('Get featured reviews error:', error);
    res.status(500).json({
      error: 'Failed to fetch featured reviews',
      message: error.message
    });
  }
});

// POST /api/reviews - Create new review
router.post('/', async (req, res) => {
  try {
    const { name, email, rating, title, content, service } = req.body;

    // Validation
    if (!name || !email || !rating || !title || !content) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: ['name', 'email', 'rating', 'title', 'content']
      });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        error: 'Rating must be between 1 and 5'
      });
    }

    // Create review (pending approval)
    const review = await prisma.review.create({
      data: {
        name: name,
        email: email,
        rating: parseInt(rating),
        title: title,
        content: content,
        isApproved: false // Requires manual approval
      },
    });

    res.status(201).json({
      success: true,
      message: 'Review submitted successfully. It will be published after approval.',
      review: {
        id: review.id,
        name: review.name,
        rating: review.rating,
        title: review.title,
        content: review.content
      }
    });

  } catch (error) {
    console.error('Create review error:', error);
    res.status(500).json({
      error: 'Failed to submit review',
      message: error.message
    });
  }
});

// GET /api/reviews/stats - Get review statistics
router.get('/stats', async (req, res) => {
  try {
    const stats = await prisma.review.aggregate({
      where: { approved: true },
      _avg: { rating: true },
      _count: { id: true }
    });

    const ratingBreakdown = await prisma.review.groupBy({
      by: ['rating'],
      where: { approved: true },
      _count: { rating: true }
    });

    res.json({
      success: true,
      stats: {
        averageRating: stats._avg.rating ? Math.round(stats._avg.rating * 10) / 10 : 0,
        totalReviews: stats._count.id,
        ratingBreakdown
      }
    });
  } catch (error) {
    console.error('Get review stats error:', error);
    res.status(500).json({
      error: 'Failed to fetch review statistics',
      message: error.message
    });
  }
});

module.exports = router;