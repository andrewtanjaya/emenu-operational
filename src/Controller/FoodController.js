import { Database } from "../Model/Database";
import { Food } from "../Model/Food";

export class FoodController {
  constructor() {}

  static async getFoodById(foodId) {
    return Food.getFoodById(foodId);
  }

  static async addFood(food) {
    return Food.addFood(food);
  }

  static async deleteFoodById(foodId) {
    return Food.deleteFoodById(foodId);
  }

  static async updateFood(food) {
    return Food.updateFood(food);
  }

  static getAllFoodsByRestaurantId(restaurantId) {
    return Database.getAllFoodsByRestaurantId(restaurantId);
  }

  static async updateFoodAvailability(foodId, foodAvailability) {
    return Food.updateFoodAvailability(foodId, foodAvailability);
  }
}
