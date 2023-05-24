import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { UserService } from "../services/userService";
import { ItemService } from "../services/itemService";
import { RequestWithToken } from "../middleware/authMiddleware";

export class ItemController {
    public static async createItem(req: RequestWithToken, res: Response) {
        try {
            const data = req.body;
            const itemService = new ItemService();
            const itemExists = await itemService.checkifItemExists(data.name);
            if (itemExists) {
                return res.status(400).send({
                    status: "error",
                    error: ["Item already exists"],
                });
            }
            let itemData: any = {
                item_name: data.name,
                item_type: data.itemType
            };
            const createItem = await itemService.create(itemData);
            return res.send({
                message: "Item created Successfully",
                data: { item: createItem },
            });
        } catch (error) {
            console.error(error);
            return res.status(500).send({
                status: "error",
                error: ["Internal Server"],
            });
        }
    }

    public static async getAllItems(req: RequestWithToken, res: Response) {
        try {
            const query = req.query;
            const itemService = new ItemService();
            const items = await itemService.getItems(
                {}
            );
            return res.send({
                status: "success",
                data: items,
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
