import { Restaurant } from "../Model/Restaurant";

export class RestaurantController {
  constructor() {}
  static async getRestaurantById(restaurantId) {
    return Restaurant.getRestaurantById(restaurantId);
  }

  static getRestaurantProfileById(restaurantId) {
    return Restaurant.getRestaurantProfileById(restaurantId)
  }

  static async addRestaurant(restaurant) {
    return Restaurant.addRestaurant(restaurant);
  }

  static updateRestaurant(restaurant) {
    return Restaurant.updateRestaurant(restaurant);
  }
}
