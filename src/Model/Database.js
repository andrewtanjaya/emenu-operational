import { getDocs, query, where } from "firebase/firestore";
import {
  categoriesRef,
  foodsRef,
  groupsRef,
  optionsRef,
  ordersRef,
  usersRef,
} from "../Config/Firebase";
import { PaymentStatus } from "../Enum/PaymentStatus";

export class Database {
  constructor() {}

  static getAllUsersByRestaurantId(restaurantId) {
    const userSnap = query(usersRef, where("restaurantId", "==", restaurantId));
    return userSnap;
  }

  static getAllCategoriesByRestaurantId(restaurantId) {
    const categorySnap = query(
      categoriesRef,
      where("restaurantId", "==", restaurantId)
    );
    return categorySnap;
  }

  static getAllFoodsByRestaurantId(restaurantId) {
    const foodSnap = query(foodsRef, where("restaurantId", "==", restaurantId));
    return foodSnap;
  }

  static getAllGroupsByFoodId(foodId) {
    const groupSnap = query(groupsRef, where("foodId", "==", foodId));
    return groupSnap;
  }

  static getAllOptionsByGroupId(groupId) {
    const optionSnap = query(optionsRef, where("groupId", "==", groupId));
    return optionSnap;
  }

  static async getUnpaidOrderByOrderTableAndRestaurantId(
    orderTable,
    restaurantId
  ) {
    return await getDocs(
      query(
        ordersRef,
        where("restaurantId", "==", restaurantId),
        where("orderTable", "==", orderTable),
        where("orderPaymentStatus", "==", PaymentStatus.UNPAID)
      )
    );
  }

  static async getUnpaidOrderByOrderQueueAndRestaurantId(
    orderQueue,
    restaurantId
  ) {
    return await getDocs(
      query(
        ordersRef,
        where("restaurantId", "==", restaurantId),
        where("orderQueue", "==", orderQueue),
        where("orderPaymentStatus", "==", PaymentStatus.UNPAID)
      )
    );
  }

  static getTakeAwayOrdersByDateBetween(startDate, endDate) {
    const orderSnap = query(
      ordersRef,
      where("orderCreatedDate", ">=", startDate),
      where("orderCreatedDate", "<=", endDate)
    );
    return orderSnap;
  }
}
