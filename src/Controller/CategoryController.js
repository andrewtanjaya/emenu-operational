import { Category } from "../Model/Category";

export class CategoryController {
  constructor() {}

  static async getCategoryById(categoryId) {
    return Category.getCategoryById(categoryId);
  }

  static async deleteCategoryById(categoryId) {
    return Category.deleteategoryById(categoryId);
  }

  static async addCategory(category) {
    return Category.addCategory(category);
  }

  static async updateCategory(category) {
    return Category.updateCategory(category);
  }

  static getAllCategoriesByRestaurantId(restaurantId) {
    return Database.getAllCategoriesByRestaurantId(restaurantId);
  }
}
