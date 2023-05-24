import { Router } from "express";
import { UserController } from "../../controller/userController";

module.exports = (router: any) => {
    router.post("/user/create", UserController.registerUser);
};
