import express from 'express';
import authController from '../controllers/authController.js';

const { registerUser, loginUser } = authController;


const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

export default router;