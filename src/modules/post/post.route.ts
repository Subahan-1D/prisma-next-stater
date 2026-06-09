
import express from "express";
import { postController } from "./post.controller";

const router = express.Router();


router.post("/", postController.createPost)
router.get("/", postController.getAllPosts)
router.get("/:id", postController.getPostById)
router.patch("/:id", postController.updatePost) 
router.delete("/:id", postController.deletePost)

export const postRoute = router