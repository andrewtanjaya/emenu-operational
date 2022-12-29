import { Database } from "../Model/Database";
import { Order } from "../Model/Order";

export class OrderController {
  constructor() {}

  static async getOrderById(orderId) {
    return Order.getOrderById(orderId);
  }

  static async addOrder(order) {
    return Order.addOrder(order);
  }

  static getTakeAwayOrdersByDateBetween(startDate, endDate) {
    return Database.getTakeAwayOrdersByDateBetween(startDate, endDate);
  }

  static async getUnpaidOrderByOrderQueueAndRestaurantId(
    orderQueue,
    restaurantId
  ) {
    return await Database.getUnpaidOrderByOrderQueueAndRestaurantId(
      orderQueue,
      restaurantId
    );
  }

  static async getUnpaidOrderByOrderTableAndRestaurantId(
    orderTable,
    restaurantId
  ) {
    return await Database.getUnpaidOrderByOrderTableAndRestaurantId(
      orderTable,
      restaurantId
    );
  }

  static  getUnpaidOrderByRestaurantIdAndDateBetween(
    restaurantId,
    startDate,
    endDate
  ) {
    console.log(restaurantId, startDate);
    return Database.getUnpaidOrderByRestaurantIdAndDateBetween(
      restaurantId,
      startDate,
      endDate
    );
  }
}
