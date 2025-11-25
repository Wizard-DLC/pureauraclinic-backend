# 🚀 Pure Aura Clinic - Backend API

RESTful API server for Pure Aura Clinic's booking system, reviews, and contact management. Built with Express.js and PostgreSQL, ready for deployment on Render.com.

## ✨ Features

- 🔗 **RESTful API**: Clean endpoints for frontend integration
- 🗄️ **PostgreSQL Database**: Robust data storage with Prisma ORM
- 📧 **Email Notifications**: Automated confirmations via Nodemailer
- 🔒 **Security**: Helmet, CORS, and rate limiting
- 🌐 **CORS Ready**: Configured for frontend deployment
- 📊 **Health Monitoring**: Built-in health check endpoints
- 🔄 **Auto Migrations**: Database schema management with Prisma

## 🛠️ Technology Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Email**: Nodemailer with Gmail SMTP
- **Security**: Helmet, CORS, express-rate-limit
- **Environment**: dotenv for configuration

## 🚀 Quick Start

### Development Setup
```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database and email settings

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma db push

# Start development server
npm run dev

# Server runs on http://localhost:5000
```

### Production Deployment (Render.com)
```bash
# Build and start
npm run build
npm start
```

## 📁 Project Structure

```
├── server.js              # Main Express server
├── package.json            # Dependencies and scripts
├── routes/
│   ├── bookings.js        # Appointment booking endpoints
│   ├── reviews.js         # Review system endpoints
│   └── contact.js         # Contact form endpoints
├── prisma/
│   └── schema.prisma      # Database schema
├── .env.example           # Environment template
└── README.md
```

## 🌐 API Endpoints

### Health Check
```
GET /api/health
Response: { "status": "ok", "timestamp": "..." }
```

### Bookings
```
POST /api/bookings
Body: {
  "name": "string",
  "email": "string",
  "phone": "string", 
  "service": "string",
  "date": "string",
  "time": "string",
  "message": "string"
}
```

### Reviews
```
POST /api/reviews
Body: {
  "name": "string",
  "email": "string",
  "rating": "number",
  "comment": "string"
}
```

### Contact
```
POST /api/contact
Body: {
  "name": "string",
  "email": "string",
  "subject": "string",
  "message": "string"
}
```

## ⚙️ Environment Variables

```bash
# Database
DATABASE_URL=postgresql://username:password@host:port/database

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
CLINIC_EMAIL=info@pureaura.clinic

# Server
NODE_ENV=production
PORT=5000
```

## 🚀 Deployment Guide

### Render.com Deployment

1. **Create New Web Service**
   - Connect this GitHub repository
   - Choose "Backend" or root directory

2. **Configure Build & Start Commands**
   ```bash
   Build Command: npm install && npx prisma generate
   Start Command: npm start
   ```

3. **Add PostgreSQL Database**
   - Create PostgreSQL service on Render
   - Copy `DATABASE_URL` to web service environment

4. **Set Environment Variables**
   - Add all variables from `.env.example`
   - Configure email SMTP settings
   - Set `NODE_ENV=production`

5. **Deploy & Test**
   - Render will auto-deploy on Git pushes
   - Test health endpoint: `https://your-app.onrender.com/api/health`

### Email Setup (Gmail)

1. **Enable 2-Factor Authentication** on Gmail
2. **Generate App Password**:
   - Google Account → Security → App passwords
   - Create password for "Mail"
3. **Use App Password** in `SMTP_PASS` (not account password)

## 🗄️ Database Schema

### Bookings
```sql
- id: String (Primary Key)
- customerName: String
- customerEmail: String
- customerPhone: String
- serviceName: String
- appointmentDate: DateTime
- appointmentTime: String
- message: String
- status: PENDING | CONFIRMED | CANCELLED
- createdAt: DateTime
```

### Reviews
```sql
- id: String (Primary Key)
- customerName: String
- customerEmail: String
- rating: Int (1-5)
- comment: String
- status: PENDING | APPROVED | REJECTED
- createdAt: DateTime
```

### Contact Messages
```sql
- id: String (Primary Key)
- name: String
- email: String
- subject: String
- message: String
- createdAt: DateTime
```

## 🔒 Security Features

- **CORS**: Configured for frontend domains
- **Helmet**: Security headers
- **Rate Limiting**: Prevents spam/abuse
- **Input Validation**: Sanitized user inputs
- **Environment Variables**: Sensitive data protection

## 📧 Email Templates

### Booking Confirmation
- Sent to customer with appointment details
- Sent to clinic with customer information
- Includes service, date, time, and price

### Review Notification
- Sent to clinic when new review submitted
- Includes rating and comment for approval

### Contact Form
- Forwards message directly to clinic email
- Preserves original sender information

## 🧪 Testing

```bash
# Test health endpoint
curl https://your-backend.onrender.com/api/health

# Test booking submission
curl -X POST https://your-backend.onrender.com/api/bookings \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com",...}'
```

## 📊 Monitoring

- **Health Check**: `/api/health` for uptime monitoring
- **Logs**: Check Render.com dashboard for request logs
- **Database**: Monitor PostgreSQL usage in Render dashboard
- **Email**: Track email delivery success/failures

## 🔄 Database Operations

```bash
# Generate Prisma client
npx prisma generate

# Push schema changes
npx prisma db push

# View database data
npx prisma studio
```

## 🤝 Integration

### Frontend Connection
The frontend should set `NEXT_PUBLIC_API_URL` to this backend's URL:
```bash
NEXT_PUBLIC_API_URL=https://your-backend-app.onrender.com
```

### CORS Configuration
Backend is configured to accept requests from:
- `https://pureaura.clinic`
- `https://www.pureaura.clinic`
- `http://localhost:3000` (development)

## 📄 License

Private project for Pure Aura Clinic. All rights reserved.

---

**🤖 Generated with [Claude Code](https://claude.ai/code)**

For API documentation or technical support, please contact the development team.