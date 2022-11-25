import { usersRef } from "../Database/Firebase";
import { deleteDoc, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { User } from "../Model/User";
import { async } from "@firebase/util";

export const getAllUsers = async () => {
  const userSnap = await getDocs(usersRef);
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