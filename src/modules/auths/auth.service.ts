import { Prisma} from "@prisma/client"
import { prisma } from "../../config/db"


const loginwithEmailAndPasword = async ({ email, password }: { email: string, password: string }) => {
    const user = await prisma.user.findUnique({
        where: {
            email, password
        }
    });

    if (!user) {
        throw new Error("User not found")
    };
    if (password === user.password) {
        return user
    }
    // if (user.password !== password) {
    //     throw new Error("Invalid password")
    // }
    else {
        throw new Error("Invalid password")
    }
}

const authWithGoogle = async(data :Prisma.UserCreateInput) =>{
    let user = await prisma.user.findUnique({
        where: {
            email: data.email}
    });
    if (!user) {
        user = await prisma.user.create({
            data
        });
    }
    return user;

}
export const authService = {
    loginwithEmailAndPasword,
    authWithGoogle
}