import { restaurantsRef } from "../Database/Firebase";
import { doc, getDoc, getDocs, setDoc } from "firebase/firestore";

export const getRestaurantById = async (restaurantId) => {
  const restoSnap = await getDoc(doc(restaurantsRef, restaurantId));
  return restoSnap.exists() ? restoSnap.data() : null;
};

export const addRestaurant = async (restaurant) => {
  await setDoc(doc(restaurantsRef, restaurant.restaurantId), Object.assign({}, restaurant));
};
