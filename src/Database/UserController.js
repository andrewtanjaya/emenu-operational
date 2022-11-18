import { usersRef } from "./Firebase";
import { getDocs } from "firebase/firestore";

export const getAllUsers = async () => {
  const userSnap = await getDocs(usersRef);
  return userSnap;
};
