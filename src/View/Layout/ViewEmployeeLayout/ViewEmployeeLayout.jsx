import React, { useEffect, useState } from "react";
import { Space, Table, Modal, Select, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { UserController } from "../../../Controller/UserController";
import "./ViewEmployeeLayout.css";
import Search from "antd/es/input/Search";

function ViewEmployeeLayout() {
  const columns = [
    {
      title: "Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Role Type",
      dataIndex: "roleType",
      key: "roleType",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Email Address",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/admin/editEmployee?id=${record.email}`}>Edit</Link>
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
  const userSession = JSON.parse(sessionStorage.getItem("userData"));
  const [keyword, setKeyword] = useState("");
  const [roleType, setRoleType] = useState("");
  const [isLoad, setIsLoad] = useState(true);
  const [usersFiltered, setUsersFiltered] = useState(null);
  const [users, isLoading, error] = useCollectionData(
    UserController.getAllUsersByRestaurantId(userSession.restaurantId),
    {
      idField: "id",
    }
  );
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoad(true);
    if (!isLoading) {
      console.log(keyword);
      setUsersFiltered(
        users.filter((u) => {
          const firstNameAndEmail =
            u.firstName.toLowerCase() + u.email.toLowerCase();
          if (roleType !== "") {
            if (keyword !== "") {
              return (
                u.roleType == roleType &&
                firstNameAndEmail.includes(keyword.toLowerCase())
              );
            }
            return u.roleType == roleType;
          }
          return firstNameAndEmail.includes(keyword.toLowerCase());
        })
      );
      setIsLoad(false);
    }
  }, [users, keyword, roleType]);

  const confirmModal = (email) => {
    Modal.confirm({
      onOk: () => {
        UserController.deleteUserByEmail(email);
      },
      title: "Delete",
      content: "Are you sure want to delete this employee?",
    });
  };

  return (
    <>
      <div className="view-employee-container">
        <h1>Employee</h1>
        <div className="employee-header-container">
          <div className="add-employee-button-container">
            <Button
              id="addButton"
              type="primary"
              onClick={() => {
                navigate("/admin/addEmployee");
              }}
            >
              Add Employee
            </Button>
          </div>
          <div className="filter-container">
            <Select
              autoFocus
              placeholder="Role"
              style={{
                width: 200,
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
              onChange={(e) => {
                if (!e) {
                  setRoleType("");
                } else {
                  setRoleType(e);
                }
              }}
            />
            <Search
              placeholder="Search employee name or email"
              style={{
                maxWidth: 600,
              }}
              onChange={(e) => {
                setKeyword(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="table-employee-container">
          <Table
            columns={columns}
            loading={isLoad}
            dataSource={usersFiltered}
            rowKey="email"
            bordered
            pagination={{
              defaultPageSize: 5,
              showSizeChanger: true,
              pageSizeOptions: ["5", "10", "20"],
            }}
            scroll={{
              x: 1200,
            }}
          />
        </div>
      </div>
    </>
  );
}
export default ViewEmployeeLayout;
