import express from "express";
const router = express.Router();

import { signin, signup } from "../controllers/user.js";

/*
router.get("/", userController.findAll);
router.post("/", userController.create);
router.get("/:id", userController.findOne);
router.put("/:id", userController.UpdateUser);
router.delete("/:id", userController.delete);
*/


router.post("/signin",signin);
router.post("/signup",signup);


export default router;