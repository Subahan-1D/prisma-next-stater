import { Request, Response } from "express";
import { userService } from "./user.service";


const createUsers = async (req: Request, res: Response) => {
    try {
        const result = await userService.createUser(req.body)
        res.status(201).json(result)

    } catch (error) {
       res.status(500).send(error)
    }
}

const getAllUsers = async (req: Request, res: Response) => {
    try {
        const result = await userService.getAllUsers()
        res.status(201).json(result)
        console.log("all data fatched successfully", result)

    } catch (error) {
      res.status(500).send(error)
    }
}

const getUserById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id as string)
        const result = await userService.getUserById(id)
        res.status(201).json(result)
        console.log("data fatched successfully", result)
    } catch (error) {
        res.status(500).send(error)
    }
}




export const userController = {
    createUsers,
    getAllUsers,
    getUserById
}
