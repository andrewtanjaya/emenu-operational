import React, { useState } from "react";
import AdminOptionForm from "../AdminOptionForm/AdminOptionForm";
import AdminOptionModal from "../AdminOptionModal/AdminOptionModal";
import "./AdminOptionGroup.css";

function AdminOptionGroup({setOptionGroups, optionGroups}) {
  const [isModalOpen, setIsModalOpen] = useState();
  const [editGroupData, setEditGroupData] = useState(null)

  return (
    <div className="option-group-container">
      <div className="option-group-title">
        <p>Option Group</p>
        <div className="add-option-button" onClick={() => {
          setEditGroupData(null)
          setIsModalOpen(true)}}>
          Add Option Group
        </div>
      </div>
      <div className="option-group-form-container">
        {
          optionGroups ? optionGroups.map((group) => {
            return <AdminOptionForm setOptionGroups={setOptionGroups} groupId={group.groupId} isFromGroup={true} optionGroup={group} optionName={group.groupName} key={group.groupId} setIsModalOpen={setIsModalOpen} setEditGroupData={setEditGroupData}/>
          }) : <></>
        }
        
      </div>
      <AdminOptionModal setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} setOptionGroups={setOptionGroups} optionGroups={optionGroups} editGroupData={editGroupData} setEditGroupData={setEditGroupData}/>
    </div>
  );
}

export default AdminOptionGroup;
