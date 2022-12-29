import { Restaurant } from "../Model/Restaurant";

export class RestaurantController {
  constructor() {}
  static async getRestaurantById(restaurantId) {
    return Restaurant.getRestaurantById(restaurantId);
  }

  static getRestaurantProfileById(restaurantId) {
    return Restaurant.getRestaurantProfileById(restaurantId);
  }

  static async addRestaurant(restaurant) {
    return Restaurant.addRestaurant(restaurant);
  }

  static updateRestaurantSetting(restaurant) {
    return Restaurant.updateRestaurantSetting(restaurant);
  }

  static updateOrderCounter(restaurantId, counter) {
    return Restaurant.updateOrderCounter(restaurantId, counter);
  }
}
