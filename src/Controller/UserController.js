import { User } from "../Model/User";
import { Database } from "../Model/Database";

export class UserController {
  constructor() {}

  static async getUserByEmail(email) {
    return User.getUserByEmail(email);
  }

  static async addUser(user) {
    return User.addUser(user);
  }

  static async deleteUserByEmail(email) {
    return User.deleteUserByEmail(email);
  }

  static async updateUser(user) {
    return User.updateUser(user);
  }

  static getAllUsersByRestaurantId(restaurantId) {
    return Database.getAllUsersByRestaurantId(restaurantId);
  }
}
