import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { restaurantsRef } from "../Config/Firebase";

export class Restaurant {
  constructor(
    restaurantId,
    restaurantName,
    restaurantPhoneNumber,
    restaurantLogoPicture,
    restaurantQris,
    tax,
    serviceCharge,
    restaurantAddress,
    restaurantBanners,
    videoUrl
  ) {
    this.restaurantId = restaurantId;
    this.restaurantName = restaurantName;
    this.restaurantPhoneNumber = restaurantPhoneNumber;
    this.restaurantLogoPicture = restaurantLogoPicture;
    this.restaurantQris = restaurantQris;
    this.tax = tax;
    this.serviceCharge = serviceCharge;
    this.restaurantAddress = restaurantAddress;
    this.restaurantBanners = restaurantBanners;
    this.videoUrl = videoUrl;
  }

  static async getRestaurantById(restaurantId) {
    const restoSnap = await getDoc(doc(restaurantsRef, restaurantId));
    return restoSnap.exists() ? restoSnap.data() : null;
  }

  static getRestaurantProfileById(restaurantId) {
    return doc(restaurantsRef, restaurantId)
  }

  static async addRestaurant(restaurant) {
    return await setDoc(
      doc(restaurantsRef, restaurant.restaurantId),
      Object.assign({}, restaurant)
    );
  }

  static async updateRestaurant(restaurant) {
    return await updateDoc(doc(restaurantsRef, restaurant.restaurantId), {
      restaurantName: restaurant.restaurantName,
      restaurantAddress: restaurant.restaurantAddress,
      restaurantBanners: restaurant.restaurantBanners,
      restaurantLogoPicture: restaurant.restaurantLogoPicture,
      restaurantQris: restaurant.restaurantQris,
      restaurantPhoneNumber: restaurant.restaurantPhoneNumber,
      serviceCharge: restaurant.serviceCharge,
      tax: restaurant.tax,
      videoUrl: restaurant.videoUrl,
    });
  }
}
