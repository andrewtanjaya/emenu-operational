import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { cartsRef } from "../Config/Firebase";

export class Cart {
  constructor(
    cartId,
    restaurantId,
    orderType,
    orderTable,
    orderQueueNumber,
    cartItems,
    totalPrice
  ) {
    this.cartId = cartId;
    this.restaurantId = restaurantId;
    this.orderType = orderType;
    this.orderTable = orderTable;
    this.orderQueueNumber = orderQueueNumber;
    this.cartItems = cartItems;
    this.totalPrice = totalPrice;
  }

  static async getCartById(cartId) {
    const cartSnap = await getDoc(doc(cartsRef, cartId));
    return cartSnap.exists() ? cartSnap.data() : null;
  }

  static getDocCartById(cartId) {
    return doc(cartsRef, cartId);
  }
  static async addCart(cart) {
    return await setDoc(doc(cartsRef, cart.cartId), Object.assign({}, cart));
  }

  static async updateCart(cart) {
    return await updateDoc(doc(cartsRef, cart.cartId), {
      cartItems: cart.cartItems,
      totalPrice: cart.totalPrice,
    });
  }
}
