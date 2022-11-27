import React, { useEffect, useState } from "react";
import { User } from "../../../Model/User";
import { RoleTypes } from "../../../Enum/RoleTypes";
import {
  deleteUserByEmail,
  getUserByEmail,
  updateUserByEmail,
} from "../../../Controller/UserController";
import { Button, Checkbox, Form, Input, Modal, Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import "./EditEmployeeLayout.css";
const { Option } = Select;

function EditEmployeeLayout() {
  const userSession = JSON.parse(sessionStorage.getItem("userData"));
  const { userId } = useParams();
  const [userData, setUserData] = useState(new User());
  const [isLoadData, setIsLoadData] = useState(true);
  const [isChangePassword, setIsChangePassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getUserByEmail(userId).then((result) => {
      if (!result) {
        navigate("not found page");
      }
      setUserData(result);
      setIsLoadData(false);
    });
  }, []);

  const onFinish = (values) => {
    let newUser = new User(
      values.firstName,
      values.lastName,
      values.firstName + values.lastName,
      userData.email,
      values.roleType,
      "profilePicture:)",
      userSession.restaurantId,
      isChangePassword ? values.password : userData.password
    );
    if (isChangePassword) {
      if (values.oldPassword !== userData.password) {
        errorModal("Invalid Old Password", "");
      } else if (values.oldPassword === values.password) {
        errorModal("Invalid Password", "Cannot use the same password!");
      } else {
        updateUserByEmail(newUser).then(() => {
          successModal("Success", "Employee Data Updated");
        });
      }
    } else {
      updateUserByEmail(newUser).then(() => {
        successModal("Success", "Employee Data Updated");
      });
    }
  };

  function successModal(title, content) {
    Modal.success({
      onOk: () => {
        navigate("/admin/employee", { replace: true });
      },
      title: title,
      content: content,
    });
  }

  function errorModal(title, content) {
    Modal.error({
      title: title,
      content: content,
    });
  }

  function handleChecklist() {
    if (isChangePassword) {
      setIsChangePassword(false);
    } else {
      setIsChangePassword(true);
    }
  }

  function confirmDeleteModal() {
    Modal.confirm({
      onOk: () => {
        deleteUserByEmail(userId);
        navigate("/admin/employee");
      },
      title: "Delete",
      content: "Are you sure want to delete this employee?",
    });
  }

  return (
    <>
      {!isLoadData && (
        <div className="add-employee-layout">
          <div className="header">
            <h1>Edit Employee</h1>
          </div>
          <div className="edit-employee-form">
            <Form
              id="editForm"
              onFinish={onFinish}
              scrollToFirstError
              initialValues={{
                email: userData.email,
                firstName: userData.firstName,
                lastName: userData.lastName,
                roleType: userData.roleType,
              }}
            >
              <Form.Item label="Email Address" name="email">
                <Input disabled />
              </Form.Item>
              <Form.Item
                label="First Name"
                name="firstName"
                rules={[
                  {
                    required: true,
                    message: "First Name must be filled!",
                  },
                ]}
              >
                <Input allowClear />
              </Form.Item>

              <Form.Item
                label="Last Name"
                name="lastName"
                rules={[
                  {
                    required: true,
                    message: "Last Name must be filled!",
                  },
                ]}
              >
                <Input allowClear />
              </Form.Item>
              <Form.Item
                label="Role Type"
                name="roleType"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please select your role!",
                  },
                ]}
              >
                <Select placeholder="Please select a role">
                  <Option value={RoleTypes.MANAGER}>Manager</Option>
                  <Option value={RoleTypes.CASHIER}>Cashier</Option>
                  <Option value={RoleTypes.KITCHEN}>Kitchen</Option>
                </Select>
              </Form.Item>

              <Checkbox onChange={handleChecklist}>Change Password</Checkbox>

              <Form.Item
                hidden={!isChangePassword}
                name="oldPassword"
                label="Old Password"
                rules={[
                  {
                    required: isChangePassword,
                    message: "Please input your current password!",
                  },
                ]}
                hasFeedback
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                hidden={!isChangePassword}
                name="password"
                label="Password"
                rules={[
                  {
                    required: isChangePassword,
                    message: "Please input your password!",
                  },
                ]}
                hasFeedback
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                hidden={!isChangePassword}
                name="confirm"
                label="Confirm Password"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: isChangePassword,
                    message: "Please confirm your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "The two passwords that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>

              <div className="button-container">
                <Form.Item>
                  <Button type="primary" danger onClick={confirmDeleteModal}>
                    Delete
                  </Button>
                </Form.Item>
                <Form.Item>
                  <Button id="saveButton" type="primary" htmlType="submit">
                    Save
                  </Button>
                </Form.Item>
              </div>
            </Form>
          </div>
        </div>
      )}
    </>
  );
}
export default EditEmployeeLayout;
