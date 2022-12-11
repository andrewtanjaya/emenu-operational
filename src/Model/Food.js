import { deleteDoc, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { foodsRef } from "../Config/Firebase";

export class Food {
  constructor(
    foodId,
    categoryId,
    restaurantId,
    foodName,
    foodAvailability,
    foodPictures,
    foodPrice,
    foodDescription,
    tags,
    orderCount,
    totalSold
  ) {
    this.foodId = foodId;
    this.categoryId = categoryId;
    this.restaurantId = restaurantId;
    this.foodName = foodName;
    this.foodAvailability = foodAvailability;
    this.foodPictures = foodPictures;
    this.foodPrice = foodPrice;
    this.foodDescription = foodDescription;
    this.tags = tags;
    this.orderCount = orderCount;
    this.totalSold = totalSold;
  }

  static async getFoodById(foodId) {
    const foodSnap = await getDoc(doc(foodsRef, foodId));
    return foodSnap.exists() ? foodSnap.data() : null;
  }

  static async addFood(food) {
    return await setDoc(doc(foodsRef, food.foodId), Object.assign({}, food));
  }

  static async deleteFoodById(foodId) {
    return await deleteDoc(doc(foodsRef, foodId));
  }

  static async updateFood(food) {
    return await updateDoc(doc(foodsRef, food.foodId), {
      foodId: food.foodId,
      categoryId: food.categoryId,
      restaurantId: food.restaurantId,
      foodName: food.foodName,
      foodAvailability: food.foodAvailability,
      foodPictures: food.foodPictures,
      foodPrice: food.foodPrice,
      foodDescription: food.foodDescription,
      tags: food.tags,
    });
  }

  static async updateFoodAvailability(foodId, foodAvailability) {
    return await updateDoc(doc(foodsRef, foodId), {
      foodAvailability: foodAvailability,
    });
  }
}
