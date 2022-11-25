import React, { useState } from "react";
import { Space, Table, Modal } from "antd";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { usersRef } from "../../../Database/Firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { deleteUserByEmail } from "../../../Controller/UserController";

function ViewEmployeeLayout() {
  const columns = [
    {
      title: "Name",
      dataIndex: "firstName",
      key: "firstName",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Role Type",
      dataIndex: "roleType",
      key: "roleType",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Email Address",
      dataIndex: "email",
      key: "email",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Link to={"/admin"}>Edit</Link>
          <Link
            onClick={() => {
              console.log(record.email);
              confirmModal(record.email);
            }}
          >
            Delete
          </Link>
        </Space>
      ),
    },
  ];

  const [users, isLoading, error] = useCollectionData(usersRef, {
    idField: "id",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const confirmModal = (email) => {
    Modal.confirm({
      onOk: () => {
        deleteUserByEmail(email);
      },
      title: "Delete",
      content: "Are you sure want to delete this employee?",
    });
  };
  return (
    <div>
      <h1>Employee</h1>
      <button
        onClick={() => {
          navigate("/admin/employee/addEmployee");
        }}
      >
        Add Employee
      </button>
      <Table columns={columns} loading={isLoading} dataSource={users} />
    </div>
  );
}
export default ViewEmployeeLayout;
