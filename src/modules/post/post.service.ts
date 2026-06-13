
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


const getAllPosts = async ({ page = 1, limit = 10, search, isFeatured }: { page?: number, limit?: number, search?: string, isFeatured?: boolean }): Promise<Post[]> => {
    console.log({ page, limit })
    const skip = (page - 1) * limit;
    console.log({ isFeatured })
    const where: any = {
        AND: [
            search && {
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
            },
            typeof isFeatured === "boolean" && { isFeatured }
        ].filter(Boolean)
    }
    const posts = await prisma.post.findMany({
        skip,
        take: limit,
        where
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

