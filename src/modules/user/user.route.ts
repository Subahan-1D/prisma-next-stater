import express from "express";
import { userController } from "./user.controller";
const router = express.Router();


router.post("/", userController.createUsers)
router.get("/", userController.getAllUsers)
router.get("/:id", userController.getUserById)
router.put("/:id", userController.updateUser)
router.delete("/:id", userController.deleteUser)

export const userRoute = router