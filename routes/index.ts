const Router = require("express").Router;
const userRoute = require("./User/userRoute");
const authRoute = require("./Auth/authRoute");

module.exports = () => {
    const router = Router();
    userRoute(router);
    authRoute(router);
    return router;
};
