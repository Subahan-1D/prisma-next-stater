import { Request, Response } from "express";
import { postService } from "./post.service";


const createPost = async (req: Request, res: Response) => {
    try {
        const result = await postService.createPost(req.body)
        console.log("post created successfully", result)
        res.status(201).json(result)
    } catch (error) {
        res.status(500).send(error)
    }
}

const getAllPosts = async (req: Request, res: Response) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const search = (req.query.search as string) || "";
        const isFeatured = req.query.isFeatured ? req.query.isFeatured === "true" : undefined
        const result = await postService.getAllPosts({ page, limit, search  , isFeatured})
        res.status(200).json(result)
    } catch (error) {
        res.status(500).send(error)
    }
}


const getPostById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id as string)
        const result = await postService.getPostById(id)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).send(error)
    }
}

const updatePost = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id as string)
        const result = await postService.updatePost(id, req.body)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).send(error)
    }
}
const deletePost = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id as string)
        const result = await postService.deletePost(id)
        res.status(201).json(result)
        console.log("data deleted successfully", result)
    } catch (error) {
        res.status(500).send(error)
    }
}

export const postController = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost
}
