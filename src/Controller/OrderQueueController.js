import { Database } from "../Model/Database";
import { OrderQueue } from "../Model/OrderQueue";

export class OrderQueueController {
  constructor() {}

  static async getOrderQueueById(orderQueueId) {
    return OrderQueue.getOrderQueueById(orderQueueId);
  }

  static async addOrderQueue(orderQueue) {
    console.log(orderQueue);
    return OrderQueue.addOrderQueue(orderQueue);
  }

  static async deleteOrderQueueById(orderQueueId) {
    return OrderQueue.deleteOrderQueueById(orderQueueId);
  }

  static getAllOrderQueueByRestaurantIdQuery(restaurantId) {
    return Database.getAllOrderQueueByRestaurantIdQuery(restaurantId);
  }
}
