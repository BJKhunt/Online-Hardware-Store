import express from "express";
import { getProduct, getProductById, getAllProduct, deleteProduct, createProduct, updateProduct } from "../controllers/product.js";
import auth from "../middleware/auth.js";
const router = express.Router();

router.get("/getproduct", auth, getProduct);
router.get("/getproductbyid/:id", auth, getProductById);
router.get('/getallproduct', auth, getAllProduct);
router.post('/createproduct', auth, createProduct);
router.delete('/deleteproduct/:id', auth, deleteProduct);
router.post('/updateproduct', auth, updateProduct);

export default router;