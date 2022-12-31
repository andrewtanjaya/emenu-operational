import { doc, setDoc } from "firebase/firestore";
import { orderSummaryRef } from "../Config/Firebase";

export class OrderSummary {
  constructor(
    orderSummaryId,
    orderPaidDate,
    soldItemSummary,
    serviceChargeAmount,
    taxAmount,
    totalOrderAmount,
    finalTotalOrderAmount
  ) {
    this.orderSummaryId = orderSummaryId;
    this.orderPaidDate = orderPaidDate;
    this.soldItemSummary = soldItemSummary;
    this.serviceChargeAmount = serviceChargeAmount;
    this.taxAmount = taxAmount;
    this.totalOrderAmount = totalOrderAmount;
    this.finalTotalOrderAmount = finalTotalOrderAmount;
  }

  static async addOrderSummary(orderSummary) {
    return await setDoc(
      doc(orderSummaryRef, orderSummary.orderSummaryId),
      Object.assign({}, orderSummary)
    );
  }
}
