# AWS Exam Prep

A web application for practicing AWS certification exam questions with progress tracking and study materials.

## Features

- Practice exams with multiple modes (adaptive, random, weak topics, missed questions, new questions)
- Progress tracking and topic mastery display
- Study materials for each AWS topic
- Collapsible sidebar navigation
- Blue-themed modern UI

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- npm (comes with Node.js)

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/clyde-salar-rp/aws-exam-web.git
   cd aws-exam-web
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

   This installs dependencies for both the client and server workspaces.

## Running the Application

**Start both client and server in development mode:**

```bash
npm run dev
```

This will start:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3001

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
- SQLite (better-sqlite3)
- TypeScript

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start both client and server in dev mode |
| `npm run dev:client` | Start only the frontend |
| `npm run dev:server` | Start only the backend |

## License

MIT
