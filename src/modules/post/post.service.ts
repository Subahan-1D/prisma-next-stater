
import { prisma } from "../../config/db";
import { Post, Prisma } from "@prisma/client";


const createPost = async (payload: Prisma.PostCreateInput): Promise<Post> => {
    const createPost = await prisma.post.create({
        data: payload
    })
    return createPost
}



export const postService = {
    createPost
}