
import express from "express";
import { postController } from "./post.controller";

const router = express.Router();


router.get("/", postController.createPost)

export const postRoute = router