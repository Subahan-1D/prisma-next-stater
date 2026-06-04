import express from "express";
import { userController } from "./user.controller";
const router = express.Router();


router.post("/", userController.createUsers)
router.get("/", userController.getAllUsers)
router.get("/:id", userController.getUserById)

export const userRoute = router