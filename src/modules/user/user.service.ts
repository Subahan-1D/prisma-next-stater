import { Prisma, User } from "@prisma/client"
import { prisma } from "../../config/db"

const createUser = async (payload: Prisma.UserCreateInput): Promise<User> => {
    const createdUser = await prisma.user.create({
        data: payload
    })
    return createdUser
}



const getAllUsers = async () => {
    const result = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            posts: true
        },
        orderBy: {

        }
    });
    return result;
}

const getUserById = async (id: number) => {
    const reusult = await prisma.user.findUnique({ where: { id } })
    return reusult
}
export const userService = {
    createUser,
    getAllUsers,
    getUserById
}