import express from "express";
import { getCompany, getUnverifiedCompany, getCompanyById, getAllCompany, deleteCompany, createCompany, verifyCompany } from "../controllers/company.js";
import auth from "../middleware/auth.js";
const router = express.Router();

router.get("/getcompany", auth, getCompany);
router.get("/getunverifiedcompany", auth, getUnverifiedCompany);
router.get("/getcompanybyid/:id", auth, getCompanyById);
router.get('/getallcompany', auth, getAllCompany);
router.post('/createcompany', auth, createCompany);
router.delete('/deletecompany/:id', auth, deleteCompany);
router.post('/verifycompany', auth, verifyCompany);

export default router;