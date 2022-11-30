import { deleteDoc, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { usersRef } from "../Config/Firebase";
import { User } from "../Model/User";
import { async } from "@firebase/util";
import { RoleTypes } from "../Enum/RoleTypes";

export const getAllUsers = async () => {
  const userSnap = await getDocs(usersRef);
  return userSnap;
};

export const getAllUsersByRestaurantId = (restaurantId) => {
  const userSnap = query(usersRef, where("restaurantId", "==", restaurantId));
  return userSnap;
};

export const registerUser = async (user) => {
  await setDoc(doc(usersRef, user.email), Object.assign({}, user));
};

export const getUserByEmail = async (email) => {
  const userSnap = await getDoc(doc(usersRef, email));
  return userSnap.exists() ? userSnap.data() : null;
};

export const deleteUserByEmail = async (email) => {
  const userSnap = await deleteDoc(doc(usersRef, email));
  return userSnap;
}

export const updateUserByEmail = async (user) => {
  await updateDoc(doc(usersRef, user.email), {
    firstName:user.firstName, 
    lastName:user.lastName, 
    userName:user.userName,
    password:user.password,
    roleType:user.roleType});
}