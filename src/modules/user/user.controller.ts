import { Request, Response } from "express";
import { userService } from "./user.service";


const createUser = async (req: Request, res: Response) => {
    try {
        const result = await userService.createUser(req.body)
        res.send(result)

    } catch (error) {
        console.log("Error creating user", error)
    }
}

const getAllUsers = async (req: Request, res: Response) => {
    try {
        const result = await userService.getAllUsers()
        res.send(result)
        console.log("all data fatched successfully", result)

    } catch (error) {
        console.log("data fatching feled!!!")
    }
}




export const userController = {
    createUser,
    getAllUsers
}
