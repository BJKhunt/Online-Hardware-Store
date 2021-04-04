import express from "express";
import { addInquiry, getInquiry } from "../controllers/inquiry.js";
import auth from "../middleware/auth.js";
const router = express.Router();

router.post('/addinquiry', auth, addInquiry);
router.get('/getinquiry', auth, getInquiry);

export default router;