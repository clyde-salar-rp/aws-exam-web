# AWS Cloud Practitioner Exam Prep

A web application for practicing AWS Cloud Practitioner (CLF-C02) certification exam questions with progress tracking and study materials.

## Features

- **Authentication & User Management**
  - Local authentication (email/password) with secure bcrypt hashing
  - Google OAuth integration
  - Role-based access control (user/admin/super_admin)
  - Forced password change on first login for security

- **Practice Exams**
  - Multiple exam modes (adaptive, random, weak topics, missed questions, new questions)
  - Session review functionality
  - Timed and untimed modes

- **Progress Tracking**
  - User-specific exam history
  - Topic mastery display
  - Performance analytics

- **Study Materials**
  - Comprehensive study notes for each AWS topic
  - Organized by exam sections

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- npm (comes with Node.js)

## Quick Start (First Time Setup)

We've created an automated deployment script for easy setup:

```bash
# 1. Clone the repository
git clone https://github.com/clyde-salar-rp/aws-exam-web.git
cd aws-exam-web

# 2. Install dependencies
npm install

# 3. Run first-time deployment script
cd server
./deploy-first-time.sh
```

The deployment script will:
- ✅ Create and configure environment variables
- ✅ Run database migrations
- ✅ Setup super admin account
- ✅ Start the development server

### Manual Installation

If you prefer manual setup:

1. **Clone the repository**

   ```bash
   git clone https://github.com/clyde-salar-rp/aws-exam-web.git
   cd aws-exam-web
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure server environment**

   ```bash
   cd server
   cp .env.example .env
   # Edit .env and configure:
   # - SUPER_ADMIN_EMAIL
   # - SUPER_ADMIN_NAME
   # - SUPER_ADMIN_PASSWORD
   # - JWT_SECRET (generate with: openssl rand -base64 32)
   ```

4. **Run database migrations**

   ```bash
   npm run migrate
   ```

5. **Setup super admin**

   ```bash
   npm run setup-admin
   ```

6. **Start the application**

   ```bash
   cd ..
   npm run dev
   ```

## Running the Application

**Start both client and server in development mode:**

```bash
npm run dev
```

This will start:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3001

**First Login:**
1. Navigate to http://localhost:5173/login
2. Login with super admin credentials from `.env`
3. You'll be prompted to change your password on first login
4. Access the dashboard

## Project Structure

```
aws-exam-web/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── pages/          # Page components
│   │   ├── lib/            # Utilities and API client
│   │   └── types/          # TypeScript types
│   └── ...
├── server/                 # Express backend
│   ├── src/
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   ├── db/             # Database setup
│   │   └── data/           # Questions and topics data
│   └── ...
└── package.json            # Root package with workspaces
```

## Tech Stack

**Frontend:**
- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui components
- TanStack Query

**Backend:**
- Express.js
- SQLite (sql.js)
- TypeScript
- Passport.js (OAuth)
- JWT tokens with HTTP-only cookies
- bcrypt password hashing

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start both client and server in dev mode |
| `npm run dev:client` | Start only the frontend |
| `npm run dev:server` | Start only the backend |

## Authentication & Security

This application includes a comprehensive authentication system with the following features:

- **Multiple Auth Methods**: Email/password and Google OAuth
- **Role-Based Access**: Three user roles (user, admin, super_admin)
- **Secure by Default**:
  - Passwords hashed with bcrypt
  - JWT tokens in HTTP-only cookies
  - Forced password change on first login
  - Environment-based configuration
- **Automated Setup**: Idempotent super admin creation from `.env`

For detailed setup instructions, see:
- [server/README.md](server/README.md) - Server setup guide
- [ENV_SETUP_GUIDE.md](ENV_SETUP_GUIDE.md) - Comprehensive deployment guide with security best practices

## Deployment

### Deploy to Vercel

This project is optimized for deployment on Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/aws-exam-prep)

**Quick Start:**
1. Click the button above (or follow manual steps in [VERCEL_QUICK_START.md](VERCEL_QUICK_START.md))
2. Setup Turso database (serverless SQLite)
3. Configure environment variables
4. Deploy!

**Full Guide:** [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md)

**Estimated time:** 15-30 minutes

### Self-Hosting

For traditional hosting (VPS, Docker, etc.):
1. Build: `npm run build`
2. Setup database (SQLite works)
3. Run: `npm start`

See [ENV_SETUP_GUIDE.md](ENV_SETUP_GUIDE.md) for details.

## Credits

Study materials and questions are based on [AWS Certified Cloud Practitioner Notes](https://github.com/kananinirav/AWS-Certified-Cloud-Practitioner-Notes) by kananinirav.

## License

MIT
