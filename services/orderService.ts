import { AppDataSource } from "../config/db";
import { Order } from "../entity/order.entity";


export class OrderService {
    async create (orderData: Order) {
        const businessCustomerRecordRepository =
        AppDataSource.manager.getRepository(Order);
    return businessCustomerRecordRepository.save(orderData);
    }

    async getOrders(filterParams: object): Promise<Order[]> {
        const orders = await AppDataSource.manager.find(
            Order,
            {
                where: filterParams,
            }
        );
        return orders;
    }

    public async updateOrder(orderId: number, updateData: any) {
        await AppDataSource.createQueryBuilder()
            .update(Order)
            .set(updateData)
            .where("id = :id", { id: orderId })
            .execute();
        const updatedData = await AppDataSource.manager.findOneBy(Order, {
            id: orderId,
        });

        return updatedData;
    }
}