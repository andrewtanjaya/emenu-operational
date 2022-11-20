import { menusRef } from "../Database/Firebase";
import { doc, getDoc, getDocs, setDoc } from "firebase/firestore";

export const addMenu = async (menu) => {
  await setDoc(doc(menusRef, menu.menuId), Object.assign({}, menu));
};

export const getMenuById = async (menuId) => {
  const menuSnap = await getDoc(doc(menusRef, menuId));
  return menuSnap.exists() ? menuSnap.data() : null;
};
