# 🤖 DadBot - Automated Reminder System

> A command center for parents to automate text message reminders to their children for payments, chores, and other important tasks.

## 📋 Overview

DadBot is a full-stack application that helps parents automate SMS reminders for:

- 💰 Car payments, insurance, and other bills
- 🏠 Chores and responsibilities
- 📅 Important dates and deadlines
- 💳 Allowance and financial reminders

## 🏗 Project Structure

```
DadBot/
├── client/                 # React frontend
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── .env
├── server/                 # Node.js backend
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API endpoints
│   ├── services/          # Business logic
│   ├── server.js          # Main server file
│   ├── package.json
│   └── .env
├── package.json           # Monorepo scripts
├── .gitignore
├── .env.example
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js 16+
- MongoDB (local or Atlas)
- Vonage account for SMS

### Installation

```bash
# 1. Clone and setup
git clone https://github.com/abutler911/DadBot.git
cd DadBot

# 2. Install all dependencies
npm run install:all

# 3. Configure environment
cp .env.example server/.env
cp .env.example client/.env
# Edit server/.env with your Vonage credentials

# 4. Start development servers
npm run dev
```

This starts:

- Backend API on `http://localhost:5000`
- Frontend app on `http://localhost:3000`

## 🔧 Configuration

### Vonage SMS Setup

1. Sign up at [Vonage Developer Portal](https://developer.vonage.com/)
2. Get API Key and Secret
3. Purchase a virtual phone number
4. Add credentials to `server/.env`:

```bash
VONAGE_API_KEY=your_api_key
VONAGE_API_SECRET=your_secret
VONAGE_FROM_NUMBER=+1234567890
```

### MongoDB Setup

**Local MongoDB:**

```bash
# Using Docker
docker run --name dadbot-mongo -p 27017:27017 -d mongo:latest
```

**MongoDB Atlas (Cloud):**

1. Create cluster at [MongoDB Atlas](https://cloud.mongodb.com)
2. Get connection string
3. Update `MONGODB_URI` in `server/.env`

## 📱 Features

### Core Functionality

- ✅ **Contact Management** - Add/edit family members with phone numbers
- ✅ **Reminder Templates** - Create reusable message templates with variables
- ✅ **Automated Scheduling** - Monthly, weekly, or one-time reminders
- ✅ **Manual Triggers** - Send reminders immediately when needed
- ✅ **Message History** - Track all sent messages and responses
- ✅ **Payment Tracking** - Mark payments as received

### Message Variables

Use these in your reminder templates:

- `{name}` - Contact's name
- `{amount}` - Payment amount with $ sign
- `{dueDate}` - Formatted due date
- `{title}` - Reminder title

**Example:**

```
"Hey {name}, your {title} of {amount} is due on {dueDate}. Don't forget! 🚗💰"
```

## 🎯 Usage Examples

### Payment Reminders

```json
{
  "title": "Car Payment",
  "message": "Hi {name}! Your car payment of {amount} is due {dueDate}. Thanks!",
  "amount": 450,
  "schedule": {
    "type": "monthly",
    "dayOfMonth": 15,
    "time": "10:00"
  },
  "reminderOffsets": [7, 3, 1, 0]
}
```

### Chore Reminders

```json
{
  "title": "Weekly Chores",
  "message": "{name}, don't forget your weekly chores today!",
  "schedule": {
    "type": "weekly",
    "dayOfWeek": 0,
    "time": "09:00"
  }
}
```

## 🛠 Development

### Available Scripts

```bash
# Start both client and server in development
npm run dev

# Start individual services
npm run server:dev    # Backend only
npm run client:dev    # Frontend only

# Build for production
npm run client:build

# Install all dependencies
npm run install:all

# Clean all node_modules
npm run clean

# Run tests
npm test
```

### API Endpoints

**Contacts:**

- `GET /api/contacts` - List all contacts
- `POST /api/contacts` - Create contact
- `PUT /api/contacts/:id` - Update contact
- `DELETE /api/contacts/:id` - Delete contact

**Reminders:**

- `GET /api/reminders` - List all reminders
- `POST /api/reminders` - Create reminder
- `PUT /api/reminders/:id` - Update reminder
- `POST /api/reminders/:id/send` - Send manual reminder
- `DELETE /api/reminders/:id` - Delete reminder

**Messages:**

- `GET /api/messages` - Message history with pagination
- `GET /api/messages/reminder/:id` - Messages for specific reminder
- `PUT /api/messages/:id/paid` - Mark payment as received
- `GET /api/messages/stats/dashboard` - Dashboard statistics

## 🔒 Security

- Environment variables for all secrets
- CORS configured for frontend domain
- Input validation on all API endpoints
- No sensitive data in client-side code

## 🚀 Deployment

### Backend (Heroku/Railway)

```bash
# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=mongodb+srv://...
heroku config:set VONAGE_API_KEY=...
# etc.

# Deploy
git push heroku main
```

### Frontend (Netlify/Vercel)

```bash
# Build
npm run client:build

# Deploy build/ directory
# Set REACT_APP_API_URL to your backend URL
```

## 📊 Monitoring

The application logs all SMS activity:

- Message sending attempts
- Delivery confirmations from Vonage
- Automated reminder processing
- Contact response tracking

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

Having issues? Check the troubleshooting guide in the environment setup docs or open an issue.

---

**Built with ❤️ by a dad who got tired of asking "Did you pay your car payment?" every month** 😅
