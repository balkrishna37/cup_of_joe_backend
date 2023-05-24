import { UserService } from "../services/userService";
import { AppDataSource } from "../config/db";
import { ItemService } from "../services/itemService";
import { OrderService } from "../services/orderService";
import { User } from "../entity/user.entity";
import { Item } from "../entity/item.entity";
import { Order } from "../entity/order.entity";
beforeAll(async ()=>{
    await AppDataSource.initialize()
    console.log("connected to DB ");
});

afterAll(async ()=>{
  // await AppDataSource.dropDatabase();
  await AppDataSource.destroy();
});

let latestUserId: any = 0;
let latestItemId: any = 0;
let latestOrderId: any = 0;

describe('Create a user', () => {
  it('should create a new user', async () => {
      const payload: any = {
          name: 'Test',
          password: 'test',
          email: 'test@gmail.com'
      }
      const userService = new UserService();
      
      const user = await userService.create(payload)
      latestUserId = user.id;
      expect(user).not.toBeNull()
  });

  afterEach(async()=>{
    await AppDataSource.manager.delete(User,latestUserId);
  })
})

describe('Create new item', () => {
  it('should create a new item', async () => {
      const payload: any = {
          item_name: 'Cappuchino',
          item_type: 'Coffee',
      }
      const itemService = new ItemService();
      const item = await itemService.create(payload)
      latestItemId = item.id;
      expect(item).not.toBeNull()
  })
  afterEach(async()=>{
    await AppDataSource.manager.delete(Item,latestItemId);
  })
})

describe('Create new order', () => {
  it('should create a new order', async () => {
      const payload: any = {
          item_id: 1,
          quantity: 1,
          status: "pending",
          ordered_by: 1
      }
      const orderService = new OrderService();
      const order = await orderService.create(payload);
      latestOrderId = order.id;
      expect(order).not.toBeNull()
  })

  afterEach(async()=>{
    await AppDataSource.manager.delete(Order,latestOrderId);
  })
})