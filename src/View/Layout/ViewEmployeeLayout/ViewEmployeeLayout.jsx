import React, { useState } from "react";
import { Space, Table, Modal, Select, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { userQuery } from "../../../Config/Firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { deleteUserByEmail } from "../../../Controller/UserController";
import "./ViewEmployeeLayout.css";
import Search from "antd/es/input/Search";

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
          <Link to={`/admin/editEmployee/${record.email}`}>Edit</Link>
          <Link
            onClick={() => {
              confirmModal(record.email);
            }}
          >
            Delete
          </Link>
        </Space>
      ),
    },
  ];

  const [keyword, setKeyword] = useState("");
  const [roleType, setRoleType] = useState("");
  const [users, isLoading, error] = useCollectionData(
    userQuery(keyword, roleType),
    {
      idField: "email",
    }
  );
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
    <>
      <div className="view-employee-container">
        <h1>Employee</h1>
        <div className="header-container">
          <Button
            type="primary"
            onClick={() => {
              navigate("/admin/addEmployee");
            }}
          >
            Add Employee
          </Button>
          <div className="filter-container">
            <Select
              placeholder="Filter"
              style={{
                width: 120,
              }}
              allowClear
              options={[
                {
                  value: "MANAGER",
                  label: "Manager",
                },
                {
                  value: "CASHIER",
                  label: "Cashier",
                },
                {
                  value: "KITCHEN",
                  label: "Kitchen",
                },
              ]}
              onSelect={(value) => {
                setRoleType(value);
              }}
            />
            <Search
              placeholder="input search text"
              style={{
                width: 200,
              }}
              onChange={(e) => {
                setKeyword(e.target.value);
                setRoleType("");
              }}
            />
          </div>
        </div>
        <div className="table-employee-container">
          <Table
            columns={columns}
            loading={isLoading}
            dataSource={users}
            rowKey="email"
          />
        </div>
      </div>
    </>
  );
}
export default ViewEmployeeLayout;
