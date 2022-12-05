import { v4 as uuid } from "uuid";
import { CategoryController } from "../Controller/CategoryController";
import { FoodController } from "../Controller/FoodController";
import { RestaurantController } from "../Controller/RestaurantController";
import { IdTypes } from "../Enum/IdTypes";

const RESTO_PREFIX = "RST-";
const CATEGORY_PREFIX = "CTG-";
const FOOD_PREFIX = "FOD-";
const GROUP_PREFIX = "GRP-";
const OPTION_PREFIX = "OPT-";
const ORDER_PREFIX = "TRX-";
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
    default:
      return "";
  }
};
