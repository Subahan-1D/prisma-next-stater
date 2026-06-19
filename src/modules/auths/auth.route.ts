


import express from "express";
import { authController } from "./auth.controller";

const router = express.Router();



router.post("/login", authController.loginWithEmailAndPassword)
router.post("/google", authController.authenticateWithGoogle)


export const authRoute = router
