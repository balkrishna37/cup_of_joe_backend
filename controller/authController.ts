import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { AppDataSource } from "../config/db";
import { User } from "../entity/user.entity";
import { Token } from "../entity/token.entity";
import { RequestWithToken } from "../middleware/authMiddleware";
import { UserService } from "../services/userService";

export class AuthController {
    public static async login(req: Request, res: Response) {
        try {
            const reqData = req.body;
            const userService = new UserService();
            const userExists = await userService.checkifUserExists(reqData.email);
            if (!userExists) {
                return res.status(401).send({
                    status: "error",
                    error: ["User Not Found"],
                });
            }

            const checkPassword = bcrypt.compareSync(
                reqData.password,
                userExists.password
            );

            if (!checkPassword) {
                return res.status(400).send({
                    status: "error",
                    error: ["Incorrect Password"],
                });
            }
            const jwtKey: string = process.env.JWT_KEY!;
            const token = jwt.sign({ phone: reqData.email }, jwtKey);
            let saveToken: any = new Token();
            saveToken.user_id = userExists.id;
            saveToken.token = token;
            await AppDataSource.manager.save(saveToken);
            let userData: any = userExists;
            delete userData.password;
            return res.send({
                status: "success",
                data: {
                    token,
                    user: userExists,
                },
            });
        } catch (error) {
            console.error(error);
            return res.status(500).send({
                status: "error",
                error: ["Internal Server"],
            });
        }
    }

    public static async logout(
        RequestWithToken: RequestWithToken,
        res: Response
    ) {
        try {
            const userExists = await AppDataSource.manager.findOne(Token, {
                where: {
                    user_id: RequestWithToken.tokenData.user_id,
                },
            });

            if (!userExists) {
                return res.status(401).send({
                    status: "error",
                    error: ["User Not Found"],
                });
            }
            await AppDataSource.manager.delete(Token, {
                user_id: RequestWithToken.tokenData.user_id,
            });
            return res.send({
                status: "success",
                message: "User logged out successfully",
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
