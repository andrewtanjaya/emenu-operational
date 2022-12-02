import { deleteDoc, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { groupsRef } from "../Config/Firebase";

export class Group {
  constructor(groupId, foodId, groupName, isRequired) {
    this.groupId = groupId;
    this.foodId = foodId;
    this.groupName = groupName;
    this.isRequired = isRequired;
  }

  static async getGroupById(groupId) {
    const groupSnap = await getDoc(doc(groupsRef, groupId));
    return groupSnap.exists() ? groupSnap.data() : null;
  }

  static async addGroup(group) {
    return await setDoc(
      doc(groupsRef, group.groupId),
      Object.assign({}, group)
    );
  }

  static async deleteGroupById(groupId) {
    return await deleteDoc(doc(groupsRef, groupId));
  }

  static async updateGroup(group) {
    return await updateDoc(doc(groupsRef, group.groupId), {
      groupName: group.groupName,
      isRequired: group.isRequired,
    });
  }
}
