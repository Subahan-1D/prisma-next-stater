
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


const getAllPosts = async ({ page = 1, limit = 10, search, isFeatured, tags }: { page?: number, limit?: number, search?: string, isFeatured?: boolean, tags?: string[] }): Promise<Post[]> => {
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
    


    const result = await prisma.$transaction(async (tx) => {
        await tx.post.update({
            where: { id },
            data: {
                views: {
                    increment: 1
                }
            },
            include: {
                author: true
            }
        });

        return await tx.post.findUnique({
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
    })
    return result


};



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


const getBlogStat = async () =>{
  return await prisma.$transaction(async(tx) =>{
        const aggregate = await tx.post.aggregate({
            _count: true,
            _sum : {views : true},
            _avg : {views : true},
            _min : {views : true},
            _max : {views : true}   
        })

        const featuredPostsCount = await tx.post.count({
            where : {
                isFeatured : true
            }
        })
        return {

           stats :{
             totalPosts : aggregate._count ?? 0,
            totalViews : aggregate._sum.views ?? 0,
            averageViews : aggregate._avg.views ?? 0,    
            minViews : aggregate._min.views ?? 0,
            maxViews : aggregate._max.views ?? 0,
           },
              featuredPostsCount :{
                count : featuredPostsCount
              }
        }
    })
}
export const postService = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
    getBlogStat
}

