import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { orderQueuesRef } from "../Config/Firebase";

export class OrderQueue {
  constructor(
    orderQueueId,
    orderId,
    orderType,
    orderTableNumber,
    orderQueueNumber,
    restaurantId,
    orderPlacedTimestamp
  ) {
    this.orderQueueId = orderQueueId;
    this.orderId = orderId;
    this.orderType = orderType;
    this.orderTableNumber = orderTableNumber;
    this.orderQueueNumber = orderQueueNumber;
    this.restaurantId = restaurantId;
    this.orderPlacedTimestamp = orderPlacedTimestamp;
  }

  static async getOrderQueueById(orderQueueId) {
    const orderQueueSnap = await getDoc(doc(orderQueuesRef, orderQueueId));
    return orderQueueSnap.exists() ? orderQueueSnap.data() : null;
  }

  static async addOrderQueue(orderQueue) {
    return await setDoc(
      doc(orderQueuesRef, orderQueue.orderQueueId),
      Object.assign({}, orderQueue)
    );
  }

  static async deleteOrderQueueById(orderQueueId) {
    return await deleteDoc(doc(orderQueuesRef, orderQueueId));
  }
}
