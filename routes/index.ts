const Router = require("express").Router;
const userRoute = require("./User/userRoute");
const authRoute = require("./Auth/authRoute");
const itemRoute = require("./Item/itemRoute");
const orderRoute = require("./Order/orderRoute");

module.exports = () => {
    const router = Router();
    userRoute(router);
    authRoute(router);
    itemRoute(router);
    orderRoute(router);
    return router;
};
