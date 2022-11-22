import { menusRef } from "../Config/Firebase";
import { doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";

export const addMenu = async (menu) => {
  await setDoc(doc(menusRef, menu.menuId), Object.assign({}, menu));
};

export const getMenuById = async (menuId) => {
  const menuSnap = await getDoc(doc(menusRef, menuId));
  return menuSnap.exists() ? menuSnap.data() : null;
};

export const updateMenuById = async (
  updatedCategoryList,
  updatedFoodList,
  menuId
) => {
  for (let i = 0; i < updatedFoodList.length; i++) {
    updatedFoodList[i] = Object.assign({}, updatedFoodList[i]);
  }
  console.log(updatedCategoryList, updatedFoodList);
  await updateDoc(doc(menusRef, menuId), {
    categoryList: updatedCategoryList,
    foodList: updatedFoodList,
  });
};
