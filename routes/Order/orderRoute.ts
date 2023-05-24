import { OrderController } from "../../controller/orderController";
import { AuthMiddleware } from "../../middleware/authMiddleware";

module.exports = (router: any) => {
    router.post("/order/create",AuthMiddleware.authenticateUser, OrderController.createOrder);
    router.get("/order", AuthMiddleware.authenticateAdmin, OrderController.getAllOrders);
    router.put("/order/:id", AuthMiddleware.authenticateAdmin, OrderController.updateOrder);
};
