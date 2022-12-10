import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "@firebase/firestore";
import { getStorage, ref } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MESAUREMENT_ID,
};

const firebase = initializeApp(firebaseConfig);
const firestore = getFirestore(firebase);
export const storage = getStorage(firebase);

export const usersRef = collection(firestore, "users");
export const restaurantsRef = collection(firestore, "restaurants");
export const foodsRef = collection(firestore, "foods");
export const groupsRef = collection(firestore, "groups");
export const optionsRef = collection(firestore, "options");
export const categoriesRef = collection(firestore, "categories");
export const cartsRef = collection(firestore, "carts");
export const ordersRef = collection(firestore, "orders");
export const orderQueuesRef = collection(firestore, "orderQueues");
export const restaurantQrisRef = (fileName) => {
  return ref(storage, "restaurant-qris/" + fileName);
};
export const restauranLogoRef = (fileName) => {
  return ref(storage, "restaurant-logo/" + fileName);
};
export const restaurantBannerRef = (fileName) => {
  return ref(storage, "restaurant-banner/" + fileName);
};
export const foodImageRef = (fileName) => {
  return ref(storage, "food-image/" + fileName);
};
