
import { prisma } from "../../config/db";
import { Post, Prisma } from "@prisma/client";


const createPost = async (payload: Prisma.PostCreateInput): Promise<Post> => {
    const createPost = await prisma.post.create({
        data: payload,
        include: {
            author: {
                select :{
                    id : true,
                    name : true,
                    email : true,
                    phone : true
                }
            }
        }
    })

    return createPost
}


console.log("post service loaded successfully", createPost)
export const postService = {
    createPost
}