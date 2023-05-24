import { AppDataSource } from "../config/db";
import { Item } from "../entity/item.entity";


export class ItemService {
    async create (itemData: Item) {
        const businessCustomerRecordRepository =
        AppDataSource.manager.getRepository(Item);
    return businessCustomerRecordRepository.save(itemData);
    }

    public async checkifItemExists(id: number) {
        const itemExists = await AppDataSource.manager.findOne(Item, {
            where: {
                id
            },
        });
        return itemExists;
    }

    async getItems(filterParams: object): Promise<Item[]> {
        const items = await AppDataSource.manager.find(
            Item,
            {
                where: filterParams,
                order: {
                    item_name: "ASC",
                },
            }
        );
        return items;
    }
}