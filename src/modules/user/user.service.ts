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
    const reusult = await prisma.user.findUnique({
        where: { id }, select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            posts: true
        }
    },)
    return reusult
}

const updateUser = async (id: number, payload: Prisma.UserUpdateInput) => {
    const result = await prisma.user.update({
        where: { id },
        data: payload
    })
    return result
}

const deleteUser = async (id: number) => {
    const result = await prisma.user.delete({
        where: { id }
    })
    return result
}
export const userService = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
}