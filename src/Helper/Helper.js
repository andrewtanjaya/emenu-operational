import { v4 as uuid } from "uuid";
import { CartController } from "../Controller/CartController";
import { CategoryController } from "../Controller/CategoryController";
import { FoodController } from "../Controller/FoodController";
import { GroupController } from "../Controller/GroupController";
import { OptionController } from "../Controller/OptionController";
import { OrderController } from "../Controller/OrderController";
import { OrderQueueController } from "../Controller/OrderQueueController";
import { RestaurantController } from "../Controller/RestaurantController";
import { IdTypes } from "../Enum/IdTypes";

const RESTO_PREFIX = "RST-";
const CATEGORY_PREFIX = "CTG-";
const FOOD_PREFIX = "FOD-";
const GROUP_PREFIX = "GRP-";
const OPTION_PREFIX = "OPT-";
const ORDER_PREFIX = "TRX-";
const CART_PREFIX = "CRT-";
const ORDER_QUEUE_PREFIX = "OQU-";
export const generateRandomId = (type) => {
  let unique_id = uuid().slice(0, 8);

  switch (type) {
    case IdTypes.RESTAURANT:
      unique_id = RESTO_PREFIX + unique_id;
      RestaurantController.getRestaurantById(unique_id).then((resto) => {
        if (resto === null) {
          return unique_id;
        } else {
          generateRandomId(IdTypes.RESTAURANT, "");
        }
      });
      return unique_id;
    case IdTypes.FOOD:
      unique_id = FOOD_PREFIX + unique_id;
      FoodController.getFoodById(unique_id).then((food) => {
        if (food === null) {
          return unique_id;
        } else {
          generateRandomId(IdTypes.FOOD, "");
        }
      });
      return unique_id;
    case IdTypes.CATEGORY:
      unique_id = CATEGORY_PREFIX + unique_id;
      CategoryController.getCategoryById(unique_id).then((category) => {
        if (category === null) {
          return unique_id;
        } else {
          generateRandomId(IdTypes.CATEGORY, "");
        }
      });
      return unique_id;
    case IdTypes.FOOD:
      unique_id = FOOD_PREFIX + unique_id;
      FoodController.getFoodById(unique_id).then((food) => {
        if (food === null) {
          return unique_id;
        } else {
          generateRandomId(IdTypes.FOOD, "");
        }
      });
      return unique_id;
    case IdTypes.GROUP:
      unique_id = GROUP_PREFIX + unique_id;
      GroupController.getGroupById(unique_id).then((group) => {
        if (group === null) {
          return unique_id;
        } else {
          generateRandomId(IdTypes.GROUP, "");
        }
      });
      return unique_id;
    case IdTypes.OPTION:
      unique_id = OPTION_PREFIX + unique_id;
      return unique_id;
    case IdTypes.ORDER:
      unique_id = ORDER_PREFIX + unique_id;
      OrderController.getOrderById(unique_id).then((order) => {
        if (order === null) {
          return unique_id;
        } else {
          generateRandomId(IdTypes.ORDER, "");
        }
      });
      return unique_id;
    case IdTypes.CART:
      unique_id = CART_PREFIX + unique_id;
      CartController.getCartById(unique_id).then((cart) => {
        if (cart === null) {
          return unique_id;
        } else {
          generateRandomId(IdTypes.CART, "");
        }
      });
      return unique_id;
    case IdTypes.ORDER_QUEUE:
      unique_id = ORDER_QUEUE_PREFIX + unique_id;
      OrderQueueController.getOrderQueueById(unique_id).then((orderQueue) => {
        if (orderQueue === null) {
          return unique_id;
        } else {
          generateRandomId(IdTypes.ORDER_QUEUE, "");
        }
      });
      return unique_id;
    default:
      return "";
  }
};

export const rupiahWithoutDecimal = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumSignificantDigits: 15,
  }).format(number);
};

export const rupiahWithDecimal = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(number);
};
