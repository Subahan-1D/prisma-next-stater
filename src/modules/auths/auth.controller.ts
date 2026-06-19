import { Request, Response } from "express"
import { authService } from "./auth.service"



const loginWithEmailAndPassword = async (req: Request, res: Response) => {
    try {
        const result = await authService.loginwithEmailAndPasword(req.body)
        console.log("Login successful", result)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).send(error)
    }
}

const authenticateWithGoogle = async (req: Request, res: Response) => {
    try {
        const result = await authService.authWithGoogle(req.body)
        console.log("Google authentication successful", result)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).send(error)
    }
}

export const authController = {
    loginWithEmailAndPassword,
    authenticateWithGoogle
}