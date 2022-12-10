import { getDocs } from "firebase/firestore";
import { Category } from "../Model/Category";
import { Database } from "../Model/Database";

export class CategoryController {
  constructor() {}

  static async getCategoryById(categoryId) {
    return Category.getCategoryById(categoryId);
  }

  static async deleteCategoryById(categoryId) {
    return Category.deleteCategoryById(categoryId);
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

  static async getAllCategoriesByRestaurantIdDocs(restaurantId) {
    const docs = await getDocs(
      this.getAllCategoriesByRestaurantId(restaurantId)
    );
    return docs;
  }
}
