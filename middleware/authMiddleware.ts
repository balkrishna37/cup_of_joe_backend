import { NextFunction, Request, Response } from "express";
import { Token } from "../entity/token.entity";
import { UserService } from "../services/userService";
const jwt = require("jsonwebtoken");

export interface TokenData {
    user_id: string;
}

export interface RequestWithToken extends Request {
    tokenData: TokenData;
}

export class AuthMiddleware {
    public static authenticateUser(
        req: RequestWithToken,
        res: Response,
        next: NextFunction
    ) {
        try {
            const bearerHeader: any = req.headers["authorization"];
            if (typeof bearerHeader == "undefined") {
                return res.status(401).send({
                    status: "error",
                    error: ["Unautorized access"],
                });
            }
            const bearerToken = bearerHeader.split(" ");
            jwt.verify(
                bearerToken[1],
                process.env.JWT_KEY,
                (err: any, authData: any) => {
                    if (err) {
                        return res.status(401).send({
                            status: "error",
                            error: ["Unautorized access"],
                        });
                    }
                    const userService = new UserService();
                    const userId: any = userService.getUserIdByJwt(
                        bearerToken[1]
                    );
                    userId.then((data: any, err: any) => {
                        if (data.length == 0) {
                            return res.status(401).send({
                                status: "error",
                                error: ["Unautorized access"],
                            });
                        }
                        const tokenData = data[0].user_id;
                        req.tokenData = { user_id: tokenData };
                        next();
                    });
                }
            );
        } catch (error) {
            console.error(error);
            return res.status(500).send({
                status: "error",
                error: ["Internal Server"],
            });
        }
    }
}
