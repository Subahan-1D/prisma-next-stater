
import { prisma } from "../../config/db";
import { Post, Prisma } from "@prisma/client";


const createPost = async (payload: Prisma.PostCreateInput): Promise<Post> => {
    const createPost = await prisma.post.create({
        data: payload,
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

    return createPost
}


const getAllPosts = async ({ page, limit, search }: { page: number, limit: number, search: string }): Promise<Post[]> => {
    console.log({ page, limit })
    const skip = (page - 1) * limit;
    const posts = await prisma.post.findMany({
        skip,
        take: limit,
        where: {
            OR: [
                {
                    title: {
                        contains: search,
                        mode: "insensitive"
                    }
                },
                  {
                    content: {
                        contains: search,
                        mode: "insensitive"
                    }
                },
            ]
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

const updatePost = async (id: number, payload: Prisma.PostUpdateInput) => {
    const post = await prisma.post.update({
        where: { id },
        data: payload
    })
    return post
}

const deletePost = async (id: number) => {
    const post = await prisma.post.delete({
        where: { id }
    })
    return post
}
export const postService = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost
}

