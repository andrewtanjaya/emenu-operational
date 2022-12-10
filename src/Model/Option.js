import { deleteDoc, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { optionsRef } from "../Config/Firebase";

export class Option {
  constructor(optionName, addedValue) {
    this.optionName = optionName;
    this.addedValue = addedValue;
  }

  static async getOptionById(optionId) {
    const optionSnap = await getDoc(doc(optionsRef, optionId));
    return optionSnap.exists() ? optionSnap.data() : null;
  }

  static async addOption(option) {
    return await setDoc(
      doc(optionsRef, option.optionId),
      Object.assign({}, option)
    );
  }

  static async deleteOptionById(optionId) {
    return await deleteDoc(doc(optionsRef, optionId));
  }

  static async updateOption(option) {
    return await updateDoc(doc(optionsRef, option.optionId), {
      optionName: option.optionName,
      addedValue: option.addedValue,
    });
  }
}
