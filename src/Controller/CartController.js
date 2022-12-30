import { Cart } from "../Model/Cart";

export class CartController {
  constructor() {}
  static async getCartById(cartId) {
    return Cart.getCartById(cartId);
  }

  static async addCart(cart) {
    return Cart.addCart(cart);
  }

  static async updateCart(cart) {
    return Cart.updateCart(cart);
  }

  static getDocCartById(cartId) {
    return Cart.getDocCartById(cartId);
  }
}
