import { v4 as uuid } from "uuid";
import { getMenuById } from "../Controller/MenuController";
import { getRestaurantById } from "../Controller/RestaurantController";
import { IdTypes } from "../Enum/IdTypes";

const RESTO_PREFIX = "RESTO-";
const MENU_PREFIX = "MENU-";

export const generateRandomId = async (type) => {
  let unique_id = uuid().slice(0, 8);

  switch (type) {
    case IdTypes.RESTAURANT:
      unique_id = RESTO_PREFIX + unique_id;
    await getRestaurantById(unique_id).then((resto) => {
        if (resto === null) {
            console.log(unique_id)
          return unique_id;
        } else {
          generateRandomId(IdTypes.RESTAURANT);
        }
      });
      return unique_id;
    case IdTypes.MENU:
      unique_id = MENU_PREFIX + unique_id;
    await getMenuById(unique_id).then((menu) => {
        if (menu === null) {
            return unique_id;
        } else {
            generateRandomId(IdTypes.MENU);
        }
      });
      return unique_id;
    default:
      return "";
  }
};
