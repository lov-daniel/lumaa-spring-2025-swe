// Package Imports
import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";

// Load environment variables
dotenv.config();

// Creating server instance
const app = express();

app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['Authorization'],
}));



// Import routes
import authRoutes from './routes/auth.js';
import taskRoutes from './routes/tasks.js'

app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

// Starts server instance
let port = process.env.PORT || 4000;

app.listen(port, 
  () => console.log(`Server listening on port ${port}`
));
