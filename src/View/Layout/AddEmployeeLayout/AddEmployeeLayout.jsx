import React from "react";
import { User } from "../../../Model/User";
import { RoleTypes } from "../../../Enum/RoleTypes";
import { UserController } from "../../../Controller/UserController";
import { Button, Form, Input, Modal, Radio, Select } from "antd";
import { useNavigate } from "react-router-dom";
import "./AddEmployeeLayout.css";
import { Gender } from "../../../Enum/Gender";
const { Option } = Select;

const AddEmployeeLayout = () => {
  const navigate = useNavigate();
  const onFinish = (values) => {
    const userSession = JSON.parse(sessionStorage.getItem("userData"));
    let newUser = new User(
      values.firstName,
      values.lastName,
      values.firstName.concat(".", values.lastName),
      values.email,
      values.roleType,
      userSession.restaurantId,
      values.password,
      values.phoneNumber,
      values.gender
    );

    UserController.getUserByEmail(newUser.email).then((user) => {
      if (user) {
        errorModal(
          "Account Exists",
          `Account with ${newUser.email} already exists!`
        );
      } else {
        UserController.addUser(newUser).then(() => {
          successModal("Success", "New Employee Added");
        });
      }
    });
  };

  const successModal = (title, content) => {
    Modal.success({
      onOk: () => {
        navigate("/admin/employee", { replace: true });
      },
      title: title,
      content: content,
    });
  };

  const errorModal = (title, content) => {
    Modal.error({
      title: title,
      content: content,
    });
  };

  return (
    <>
      <div className="add-employee-layout">
        <div className="header">
          <h1>Add Employee</h1>
        </div>

        <div className="add-employee-form">
          <Form
            id="addForm"
            name="register"
            onFinish={onFinish}
            scrollToFirstError
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 18,
            }}
          >
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
              <Input />
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
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email Address"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Role Type"
              name="roleType"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please select your country!",
                },
              ]}
            >
              <Select placeholder="Please select a country">
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
            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
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

            <Form.Item wrapperCol={{ offset: 4, span: 24 }}>
              <Button id="saveButton" type="primary" htmlType="submit">
                Save
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};
export default AddEmployeeLayout;
