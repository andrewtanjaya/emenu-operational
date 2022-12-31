import { OrderSummary } from "../Model/OrderSummary";

export class OrderSummaryController {
  constructor() {}

  static async addOrderSummary(orderSummary) {
    return OrderSummary.addOrderSummary(orderSummary);
  }
}
