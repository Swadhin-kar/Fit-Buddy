import express from 'express'
import { registerUser, loginUser, refresh, logout, verify } from '../controller/user.controller.js'
const router = express.Router()
import protect from '../middleware/authMiddleware.js'

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.post("/refresh", refresh);
router.post("/logout", logout);
router.get('/verify', protect, verify);


export default router