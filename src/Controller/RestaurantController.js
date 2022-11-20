import { restaurantsRef } from "../Database/Firebase";
import { doc, getDoc, getDocs, setDoc } from "firebase/firestore";

export const getRestaurantById = async (restaurantId) => {
    const restoSnap = await getDoc(doc(restaurantsRef, restaurantId));
    return restoSnap.exists() ? restoSnap.data() : null;
  };