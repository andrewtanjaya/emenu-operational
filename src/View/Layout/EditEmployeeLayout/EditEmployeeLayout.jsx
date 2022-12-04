import React, { useEffect, useState } from "react";
import { User } from "../../../Model/User";
import { RoleTypes } from "../../../Enum/RoleTypes";
import { UserController } from "../../../Controller/UserController";
import { Button, Checkbox, Form, Input, Modal, Radio, Select } from "antd";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import "./EditEmployeeLayout.css";
import { Gender } from "../../../Enum/Gender";
const { Option } = Select;

function EditEmployeeLayout() {
  const userSession = JSON.parse(sessionStorage.getItem("userData"));
  const [searchParams, setSearchParams] = useSearchParams();
  const userId = searchParams.get("id");
  const [userData, setUserData] = useState(new User());
  const [isLoadData, setIsLoadData] = useState(true);
  const [isChangePassword, setIsChangePassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    UserController.getUserByEmail(userId).then((result) => {
      if (!result) {
        navigate("not found page");
      }
      setUserData(result);
      setIsLoadData(false);
    });
  }, []);

  const onFinish = (values) => {
    let user = new User(
      values.firstName,
      values.lastName,
      values.firstName.concat(".", values.lastName),
      userData.email,
      values.roleType,
      userSession.restaurantId,
      isChangePassword ? values.password : userData.password,
      values.phoneNumber,
      values.gender
    );
    if (isChangePassword) {
      if (values.oldPassword !== userData.password) {
        errorModal("Invalid Old Password", "");
      } else {
        UserController.updateUser(user).then(() => {
          successModal("Success", "Employee Data Updated");
        });
      }
    } else {
      UserController.updateUser(user).then(() => {
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
        UserController.deleteUserByEmail(userId);
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
                phoneNumber: userData.phoneNumber,
                gender: userData.gender,
              }}
              labelCol={{
                span: 4,
              }}
              wrapperCol={{
                span: 18,
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
              <Form.Item
                label="Phone Number"
                name="phoneNumber"
                rules={[
                  {
                    required: true,
                    message: "Phone Number must be filled!",
                  },
                  () => ({
                    validator(_, value) {
                      if (!value || !isNaN(value)) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error("Invalid Phone Number"));
                    },
                  }),
                ]}
              >
                <Input t />
              </Form.Item>

              <Form.Item
                label="Gender"
                name="gender"
                rules={[
                  {
                    required: true,
                    message: "Gender must be choosen!",
                  },
                ]}
              >
                <Radio.Group>
                  <Radio value={Gender.MALE}> Male </Radio>
                  <Radio value={Gender.FEMALE}> Female </Radio>
                </Radio.Group>
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
                  () => ({
                    validator(_, value) {
                      if (!value || userData.password === value) {
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
              <Form.Item wrapperCol={{ offset: 4, span: 18 }}>
                <Button
                  type="primary"
                  danger
                  htmlType="button"
                  onClick={confirmDeleteModal}
                >
                  Delete
                </Button>
                <Button id="saveButton" type="primary" htmlType="submit">
                  Save
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      )}
    </>
  );
}
export default EditEmployeeLayout;
