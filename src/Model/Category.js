import { deleteDoc, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { categoriesRef } from "../Config/Firebase";

export class Category {
  constructor(categoryId, restaurantId, categoryName, categoryIcon) {
    this.categoryId = categoryId;
    this.restaurantId = restaurantId;
    this.categoryName = categoryName;
    this.categoryIcon = categoryIcon;
  }

  static async getCategoryById(categoryId) {
    const categorySnap = await getDoc(doc(categoriesRef, categoryId));
    return categorySnap.exists() ? categorySnap.data() : null;
  }

  static async addCategory(category) {
    return await setDoc(
      doc(categoriesRef, category.categoryId),
      Object.assign({}, category)
    );
  }

  static async deleteCategoryById(categoryId) {
    return await deleteDoc(doc(categoriesRef, categoryId));
  }

  static async updateCategory(category) {
    return await updateDoc(doc(categoriesRef, category.categoryId), {
      categoryName: category.categoryName,
      categoryIcon: category.categoryIcon,
    });
  }
}
