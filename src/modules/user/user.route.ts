import express from "express";
import { userController } from "./user.controller";
const router = express.Router();


router.post("/", userController.createUsers)
router.get("/", userController.getAllUsers)
router.get("/:id", userController.getUserById)
router.put("/:id", userController.updateUser)


export const userRoute = router