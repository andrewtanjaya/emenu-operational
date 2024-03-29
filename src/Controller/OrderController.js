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

  static async updateOrder(order) {
    return Order.updateOrder(order);
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

  static getUnpaidOrderByRestaurantId(restaurantId) {
    return Database.getUnpaidOrderByRestaurantId(restaurantId);
  }

  static async getAllOrderByRestaurantId(restaurantId) {
    return await Database.getAllOrderByRestaurantId(restaurantId);
  }

  static getAllOrderByRestaurantIdQuery(restaurantId) {
    return Database.getAllOrderByRestaurantIdQuery(restaurantId);
  }

  static getAllOrderByRestaurantIdAndBetweenDateQuery(
    restaurantId,
    startDate,
    endDate
  ) {
    return Database.getAllOrderByRestaurantIdAndBetweenDateQuery(
      restaurantId,
      startDate,
      endDate
    );
  }

  static async updateOrderItems(order) {
    return Order.updateOrderItems(order);
  }
}
