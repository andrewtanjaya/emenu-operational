import { categoriesRef } from "../Database/Firebase";
import { doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { Category } from "../Model/Category";

export const getAllUsers = async () => {
    const categorySnap = await getDocs(categoriesRef);
    return categorySnap;
};