import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
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
    taxRate,
    serviceChargeRate,
    totalOrderAmount,
    serviceChargeAmount,
    taxAmount,
    finalTotalOrderAmount,
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
    this.taxRate = taxRate;
    this.serviceChargeRate = serviceChargeRate;
    this.totalOrderAmount = totalOrderAmount;
    this.serviceChargeAmount = serviceChargeAmount;
    this.taxAmount = taxAmount;
    this.finalTotalOrderAmount = finalTotalOrderAmount;
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

  static async updateOrder(order) {
    return await updateDoc(
      doc(ordersRef, order.orderId),
      Object.assign({}, order)
    );
  }

  static async updateOrderItems(order) {
    return await updateDoc(doc(ordersRef, order.orderId), {
      orderItems: order.orderItems,
      totalOrderAmount: order.totalOrderAmount,
      serviceChargeAmount: order.serviceChargeAmount,
      taxAmount: order.taxAmount,
      finalTotalOrderAmount: order.finalTotalOrderAmount,
    });
  }
}
