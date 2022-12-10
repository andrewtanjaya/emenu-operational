import { Database } from "../Model/Database";
import { Option } from "../Model/Option";

export class OptionController {
  constructor() {}

  static async getOptionById(optionId) {
    return Option.getOptionById(optionId);
  }

  static async addOption(option) {
    return Option.addOption(option);
  }

  static async deleteOptionById(optionId) {
    return Option.deleteOptionById(optionId);
  }

  static async updateOption(option) {
    return Option.updateOption(option);
  }

  static getAllOptionsByGroupId(groupId) {
    return Database.getAllOptionsByGroupId(groupId);
  }
}
