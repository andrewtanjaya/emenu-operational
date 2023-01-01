import { Database } from "../Model/Database";
import { OrderSummary } from "../Model/OrderSummary";

export class OrderSummaryController {
  constructor() {}

  static async getOrderSummaryByDateBetween(startDate, endDate) {
    return await Database.getOrderSummaryByDateBetween(startDate, endDate);
  }

  static async addOrderSummary(orderSummary) {
    return OrderSummary.addOrderSummary(orderSummary);
  }
}
