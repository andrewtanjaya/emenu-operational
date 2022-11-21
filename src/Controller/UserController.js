import { usersRef } from "../Config/Firebase";
import { doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { User } from "../Model/User";

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