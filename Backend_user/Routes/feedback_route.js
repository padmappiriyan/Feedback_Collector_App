import express from 'express';
import { add_feedback, get_feedback } from '../Controllers/feedback_controller.js';
const router = express.Router();


router.post('/add-feedback', add_feedback);
router.get('/get-feedback', get_feedback);

export default router;