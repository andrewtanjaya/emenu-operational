import { Group } from "../Model/Group";

export class GroupController {
  constructor() {}

  static async getGroupById(groupId) {
    return Group.getGroupById(groupId);
  }

  static async addGroup(group) {
    return Group.addGroup(group);
  }

  static async deleteGroupById(groupId) {
    return Group.deleteGroupById(groupId);
  }

  static async updateGroup(group) {
    return Group.updateGroup(group);
  }

  static getAllGroupsByFoodId(foodId) {
    return Database.getAllGroupsByFoodId(foodId);
  }
}
