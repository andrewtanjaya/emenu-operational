import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { restaurantsRef } from "../Config/Firebase";

export class Restaurant {
  constructor(
    restaurantId,
    restaurantName,
    restaurantPhoneNumber,
    restaurantLogoPicture,
    tax,
    serviceCharge,
    restaurantAddress,
    restaurantBanners,
    videoUrl
  ) {
    this.restaurantId = restaurantId;
    this.restaurantName = restaurantName;
    this.restaurantAddress = restaurantAddress;
    this.restaurantBanners = restaurantBanners;
    this.restaurantLogoPicture = restaurantLogoPicture;
    this.restaurantPhoneNumber = restaurantPhoneNumber;
    this.serviceCharge = serviceCharge;
    this.tax = tax;
    this.videoUrl = videoUrl;
  }

  static async getRestaurantById(restaurantId) {
    const restoSnap = await getDoc(doc(restaurantsRef, restaurantId));
    return restoSnap.exists() ? restoSnap.data() : null;
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
      restaurantPhoneNumber: restaurant.restaurantPhoneNumber,
      serviceCharge: restaurant.serviceCharge,
      tax: restaurant.tax,
      videoUrl: restaurant.videoUrl,
    });
  }
}
