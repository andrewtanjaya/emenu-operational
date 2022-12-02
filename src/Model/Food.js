import { deleteDoc, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { foodsRef } from "../Config/Firebase";

export class Food {
  constructor(
    foodId,
    categoryId,
    restaurantId,
    foodName,
    availability,
    mainPicture,
    foodPrice,
    addedPicture,
    foodDescription,
    tags,
    orderCount,
    totalSales
  ) {
    this.foodId = foodId;
    this.categoryId = categoryId;
    this.restaurantId = restaurantId;
    this.foodName = foodName;
    this.availability = availability;
    this.mainPicture = mainPicture;
    this.foodPrice = foodPrice;
    this.addedPicture = addedPicture;
    this.foodDescription = foodDescription;
    this.tags = tags;
    this.orderCount = orderCount;
    this.totalSales = totalSales;
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
      availability: food.availability,
      mainPicture: food.mainPicture,
      foodPrice: food.foodPrice,
      addedPicture: food.addedPicture,
      foodDescription: food.foodDescription,
      tags: food.tags,
      orderCount: food.orderCount,
      totalSales: food.totalSales,
    });
  }
}
