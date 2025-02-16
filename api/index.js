import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'; // ✅ Use import (not require)
import cookieParser from 'cookie-parser';
import path from 'path';

// Import Routes
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import postRoutes from './routes/post.route.js';
import commentRoutes from './routes/comment.route.js';

dotenv.config();

// Validate MongoDB Connection String
const MONGO_URI = process.env.MONGO;
if (!MONGO_URI) {
  console.error("❌ Error: MONGO is not defined in .env file!");
  process.exit(1);
}

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      dbName: 'your-database-name', // Add your database name here (optional)
    });
    console.log('✅ MongoDB is connected');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    process.exit(1);
  }
};

connectDB();

const __dirname = path.resolve();
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors()); // ✅ CORS middleware

// API Routes
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);

// Serve Frontend (if deployed)
app.use(express.static(path.join(__dirname, 'client', 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.message);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}!`);
});

app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  next();
});

