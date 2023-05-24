import { Request, Response } from "express";
import { ItemService } from "../services/itemService";
import { RequestWithToken } from "../middleware/authMiddleware";
import { OrderService } from "../services/orderService";

export class OrderController {
    public static async createOrder(req: RequestWithToken, res: Response) {
        try {
            const data = req.body;
            const itemService = new ItemService();
            const orderService = new OrderService();
            const itemExists = await itemService.checkifItemExists(data.itemId);
            if (!itemExists) {
                return res.status(400).send({
                    status: "error",
                    error: ["Item does not exists"],
                });
            }
            let orderData: any = {
                item_id: data.itemId,
                ordered_by: req.tokenData.user_id,
                quantity: data.quantity
            };
            if(data.description) {
                orderData.description = data.description
            }
            const createOrder = await orderService.create(orderData);
            return res.send({
                message: "Order created Successfully",
                data: { item: createOrder },
            });
        } catch (error) {
            console.error(error);
            return res.status(500).send({
                status: "error",
                error: ["Internal Server"],
            });
        }
    }

    public static async getAllOrders(req: RequestWithToken, res: Response) {
        try {
            const query = req.query;
            const orderService = new OrderService();
            const orders = await orderService.getOrders(
                {}
            );
            return res.send({
                status: "success",
                data: orders,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).send({
                status: "error",
                error: ["Internal Server"],
            });
        }
    }

    public static async updateOrder(req: RequestWithToken, res: Response) {
        try {
            const reqBody = req.body;
            const params: any = req.params;
            const orderService = new OrderService();
            const updateData: any = {
                status: reqBody.status
            }
            const updateOrder = await orderService.updateOrder(params.id,updateData);
            return res.send({
                status: "success",
                message: "Order Updated successfully",
                data: updateOrder,
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
