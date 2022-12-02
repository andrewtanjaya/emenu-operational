import { query, where } from "firebase/firestore";
import {
  categoriesRef,
  foodsRef,
  groupsRef,
  optionsRef,
  usersRef,
} from "../Config/Firebase";

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
}
