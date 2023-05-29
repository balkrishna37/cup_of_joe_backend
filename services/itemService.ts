import { AppDataSource } from "../config/db";
import { Item } from "../entity/item.entity";
import { Url } from "../entity/url.entity";
const randomstring = require("randomstring");

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

    async shortenUrl(url: string) {
        const urlId = randomstring.generate(5);
        const shortenedUrl = `${process.env.BASE_URl}/${urlId}`;
        let urlData = new Url();
        urlData.long_url = url;
        urlData.short_url = shortenedUrl;
        urlData.url_id = urlId;
        await AppDataSource.manager.save(urlData);
        return shortenedUrl;
    }
    
    async checkIfLongUrlExists (longUrl: any) {
        const url = await AppDataSource.manager.findBy(Url, {
                long_url: longUrl
        });

        if(!url) {
            return false;
        }
        else {
            return true;
        }


    }

    async checkIfUrlIdExists (urldId: any) {
        const urlId = await AppDataSource.manager.findBy(Url, {
                url_id: urldId
        });

        if(!urlId) {
            return false;
        }
        else {
            return urlId;
        }


    }
}