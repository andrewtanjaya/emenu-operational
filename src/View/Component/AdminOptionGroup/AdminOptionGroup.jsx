import { Button, Form, Input, Modal } from "antd";
import React, { useState } from "react";
import AdminOptionForm from "../AdminOptionForm/AdminOptionForm";
import AdminOptionModal from "../AdminOptionModal/AdminOptionModal";
import "./AdminOptionGroup.css";

function AdminOptionGroup() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="option-group-container">
      <div className="option-group-title">
        <p>Option Group</p>
        <div className="add-option-button" onClick={() => setIsModalOpen(true)}>
          Add Option Group
        </div>
      </div>
      <div className="option-group-form-container">
        <AdminOptionForm optionName={"Spicyness"} key="1" />
      </div>
      <AdminOptionModal setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen}/>
    </div>
  );
}

export default AdminOptionGroup;
