import express from "express";
import { addOrder, getOrder, acceptOrder, dispatchOrder, declineOrder } from "../controllers/order.js";
import auth from "../middleware/auth.js";
const router = express.Router();

router.post('/addorder', auth, addOrder);
router.get('/getorder', auth, getOrder);
router.get('/acceptorder/:id', auth, acceptOrder);
router.get('/dispatchorder/:id', auth, dispatchOrder);
router.delete('/declineorder/:id', auth, declineOrder);

export default router;