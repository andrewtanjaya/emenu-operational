import { deleteDoc, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { usersRef } from "../Config/Firebase";

export class User {
  constructor(
    firstName,
    lastName,
    userName,
    email,
    roleType,
    restaurantId,
    password,
    phoneNumber,
    gender
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.userName = userName;
    this.email = email;
    this.roleType = roleType;
    this.restaurantId = restaurantId;
    this.password = password;
    this.phoneNumber = phoneNumber;
    this.gender = gender;
  }

  static async getUserByEmail(email) {
    const userSnap = await getDoc(doc(usersRef, email));
    return userSnap.exists() ? userSnap.data() : null;
  }

  static getUserProfileByEmail(email) {
    return doc(usersRef, email)
  }

  static async addUser(user) {
    return await setDoc(doc(usersRef, user.email), Object.assign({}, user));
  }

  static async deleteUserByEmail(email) {
    return await deleteDoc(doc(usersRef, email));
  }

  static async updateUser(user) {
    return await updateDoc(doc(usersRef, user.email), {
      firstName: user.firstName,
      lastName: user.lastName,
      userName: user.userName,
      roleType: user.roleType,
      password: user.password,
      phoneNumber: user.phoneNumber,
      gender: user.gender,
    });
  }
}
