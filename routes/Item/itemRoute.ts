import { ItemController } from "../../controller/itemController";
import { AuthMiddleware } from "../../middleware/authMiddleware";

module.exports = (router: any) => {
    router.post("/item/create",AuthMiddleware.authenticateAdmin, ItemController.createItem);
    router.get("/items",AuthMiddleware.authenticateAdmin, ItemController.getAllItems);
};
