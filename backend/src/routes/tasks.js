import express from 'express';
import authenticateJWT from '../middleware/authMiddleware.js';
import { addTask, deleteTask, findTasksByUser, updateTaskByUser } from '../controllers/taskController.js'; // Import your task functions

const router = express.Router();

// Create a new task
router.post("/", authenticateJWT, addTask);

// Get all tasks for a user
router.get("/:id", authenticateJWT, findTasksByUser);

// Update a task
router.put("/:id", authenticateJWT, updateTaskByUser);

// Delete a task
router.delete("/:id", authenticateJWT, deleteTask);

export default router;