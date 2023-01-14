import { Database } from "../Model/Database";
import { OrderSummary } from "../Model/OrderSummary";

export class OrderSummaryController {
  constructor() {}

  static async getOrderSummaryByDateBetween(restaurantId, startDate, endDate) {
    return await Database.getOrderSummaryByDateBetween(restaurantId,startDate, endDate);
  }

  static async addOrderSummary(orderSummary) {
    return OrderSummary.addOrderSummary(orderSummary);
  }
}
