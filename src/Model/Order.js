import { doc, getDoc, setDoc } from "firebase/firestore";
import { ordersRef } from "../Config/Firebase";

export class Order {
  constructor(
    orderId,
    restaurantId,
    orderType,
    orderTable,
    orderQueue,
    orderPaymentStatus,
    orderCreatedBy,
    orderCheckoutBy,
    orderCreatedDate,
    orderPaidDate,
    orderItems,
    subTotalOrderAmount,
    serviceChargeAmount,
    taxAmount,
    totalOrderAmount,
    paymentMethod
  ) {
    this.orderId = orderId;
    this.restaurantId = restaurantId;
    this.orderType = orderType;
    this.orderTable = orderTable;
    this.orderQueue = orderQueue;
    this.orderPaymentStatus = orderPaymentStatus;
    this.orderCreatedBy = orderCreatedBy;
    this.orderCheckoutBy = orderCheckoutBy;
    this.orderCreatedDate = orderCreatedDate;
    this.orderPaidDate = orderPaidDate;
    this.orderItems = orderItems;
    this.subTotalOrderAmount = subTotalOrderAmount;
    this.serviceChargeAmount = serviceChargeAmount;
    this.taxAmount = taxAmount;
    this.totalOrderAmount = totalOrderAmount;
    this.paymentMethod = paymentMethod;
  }
  static async getOrderById(orderId) {
    const orderSnap = await getDoc(doc(ordersRef, orderId));
    return orderSnap.exists() ? orderSnap.data() : null;
  }

  static async addOrder(order) {
    return await setDoc(
      doc(ordersRef, order.orderId),
      Object.assign({}, order)
    );
  }
}
