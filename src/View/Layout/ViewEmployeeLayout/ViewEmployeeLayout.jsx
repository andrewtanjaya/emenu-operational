import React, { useEffect, useState } from "react";
import { Space, Table, Modal, Select, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useCollectionData } from "react-firebase-hooks/firestore";
import {
  deleteUserByEmail,
  getAllUsersByRestaurantId,
} from "../../../Controller/UserController";
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
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Email Address",
      dataIndex: "email",
      key: "email",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      render: (text) => <a>{text}</a>,
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
    getAllUsersByRestaurantId(userSession.restaurantId),
    {
      idField: "email",
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
      // for (let i = 0; i < 100; i++) {
      //   setUsersFiltered((usersFiltered) => {
      //     return [...usersFiltered, usersFiltered[0]];
      //   });
      // }
      setIsLoad(false);
    }
  }, [users, keyword, roleType]);

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
            id="addButton"
            type="primary"
            onClick={() => {
              navigate("/admin/addEmployee");
            }}
          >
            Add Employee
          </Button>
          <div className="filter-container">
            <Select
              autoFocus
              placeholder="Filter"
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
              placeholder="input search text"
              style={{
                width: 300,
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
              x: "1920px",
            }}
          />
        </div>
      </div>
    </>
  );
}
export default ViewEmployeeLayout;
