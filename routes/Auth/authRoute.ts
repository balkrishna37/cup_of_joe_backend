import { Router } from "express";
import { AuthController } from "../../controller/authController";
import { AuthMiddleware } from "../../middleware/authMiddleware";

module.exports = (router: any) => {
    router.post("/login", AuthController.login);
    router.post(
        "/logout",
        AuthMiddleware.authenticateUser,
        AuthController.logout
    );
};
