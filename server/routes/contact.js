import express from "express";
import { addContact } from "../controllers/contact.js";
import auth from "../middleware/auth.js";
const router = express.Router();

router.post('/', auth, addContact);

export default router;