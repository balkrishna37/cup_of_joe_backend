import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { UserService } from "../services/userService";

export class UserController {
    public static async registerUser(req: Request, res: Response) {
        try {
            const data = req.body;
            const query: any = req.query;
            const userService = new UserService();
            const userExists = await userService.checkifUserExists(data.email);
            if (userExists) {
                return res.status(400).send({
                    status: "error",
                    error: ["User already exists"],
                });
            }
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(data.password, salt);
            let userData: any = {
                name: data.fullName,
                email: data.email,
                password: hashedPassword
            };
            if(query.isAdmin=="true") {
                userData.is_admin = true
            }
            const createUser = await userService.create(userData);
            return res.send({
                message: "User registered Successfully",
                data: { user: createUser },
            });
        } catch (error) {
            console.error(error);
            return res.status(500).send({
                status: "error",
                error: ["Internal Server"],
            });
        }
    }
}
