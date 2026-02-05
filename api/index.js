// Vercel serverless function entry point
// This wraps the Express app for Vercel's serverless environment

import app from '../server/dist/index.js';

// Export the Express app as a Vercel serverless function
export default app;
