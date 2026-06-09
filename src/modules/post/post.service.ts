
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


const getAllPosts = async (): Promise<Post[]> => {
    const posts = await prisma.post.findMany({
        include: {
            author: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    phone: true
                }
            }
        }
    })
    return posts
}


const getPostById = async (id: number) => {
    const post = await prisma.post.findUnique({
        where: { id },
        include: {
            author: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    phone: true
                }
            }
        }
    })
    return post
}

export const postService = {
    createPost,
    getAllPosts,
    getPostById
}
