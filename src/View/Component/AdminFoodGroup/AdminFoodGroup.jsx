import { Button, Form, Space, Table } from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import AdminAddOptionModal from "../AdminAddOptionModal/AdminAddOptionModal";
import AdminEditOptionModal from "../AdminEditOptionModal/AdminEditOptionModal";
import "./AdminFoodGroup.css";

function AdminFoodGroup({ groupData, setGroupData }) {
  const columns = [
    {
      title: "Name",
      dataIndex: "groupName",
      key: "groupName",
      width: "65%",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Link
            onClick={() => {
              setOptionData(record.options);
              setEditFormInitialValue(record);
              setIsEditModalOpen(true);
            }}
          >
            Edit
          </Link>
          <Link
            onClick={() => {
              deleteGroup(record);
            }}
          >
            Delete
          </Link>
        </Space>
      ),
    },
  ];
  //state for modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [optionData, setOptionData] = useState([]);
  const [editForm] = useForm();

  function setEditFormInitialValue(record) {
    editForm.setFieldsValue({
      groupId: record.groupId,
      groupName: record.groupName,
      isRequired: record.isRequired,
    });
  }

  function deleteGroup(record) {
    const index = groupData.indexOf(record);
    const newGroupData = groupData.slice();
    newGroupData.splice(index, 1);
    setGroupData(newGroupData);
  }

  return (
    <div className="option-group-container">
      <div className="option-group-title">
        <p>Option Group</p>
        <Button
          //   className="add-option-button"
          id="addGroupButton"
          type="default"
          onClick={() => {
            setIsAddModalOpen(true);
          }}
        >
          Add Option Group
        </Button>
      </div>
      <div className="option-group-form-container">
        <Table
          showHeader={false}
          columns={columns}
          dataSource={groupData}
          rowKey="groupId"
          pagination={false}
        />
      </div>
      <AdminAddOptionModal
        isAddModalOpen={isAddModalOpen}
        setIsAddModalOpen={setIsAddModalOpen}
        setGroupData={setGroupData}
      ></AdminAddOptionModal>

      <AdminEditOptionModal
        isEditModalOpen={isEditModalOpen}
        setIsEditModalOpen={setIsEditModalOpen}
        groupData={groupData}
        setGroupData={setGroupData}
        optionData={optionData}
        setOptionData={setOptionData}
        editForm={editForm}
      ></AdminEditOptionModal>
    </div>
  );
}

export default AdminFoodGroup;
