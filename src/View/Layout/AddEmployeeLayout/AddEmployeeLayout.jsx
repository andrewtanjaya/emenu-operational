import React, { useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { User } from "../../../Model/User";
import { RoleTypes } from "../../../Enum/RoleTypes";
import { generateRandomId } from "../../../Helper/Helper";
import {
  getUserByEmail,
  registerUser,
} from "../../../Controller/UserController";
import {
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
} from "antd";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const AddEmployeeLayout = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const onFinish = (values) => {
    const userSession = JSON.parse(sessionStorage.getItem("userData"));
    let newUser = new User(
      values.firstName,
      values.lastName,
      values.firstName + values.lastName,
      values.email,
      RoleTypes.MANAGER,
      "profilePicture:)",
      userSession.restaurantId,
      values.password
    );

    getUserByEmail(newUser.email).then((user) => {
      if (user) {
        errorModal(
          "Account Exists",
          `Account with ${newUser.email} already exists!`
        );
      } else {
        registerUser(newUser).then(() => {
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
    <div>
      <h1>Add Employee</h1>
      <Form form={form} name="register" onFinish={onFinish} scrollToFirstError>
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
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        {/* <Form.Item
        name="phone"
        label="Phone Number"
        rules={[
          {
            required: true,
            message: "Please input your phone number!",
          },
        ]}
      >
        <Input
          addonBefore={prefixSelector}
          style={{
            width: "100%",
          }}
        />
      </Form.Item>

      <Form.Item
        name="gender"
        label="Gender"
        rules={[
          {
            required: true,
            message: "Please select gender!",
          },
        ]}
      >
        <Select placeholder="select your gender">
          <Option value="male">Male</Option>
          <Option value="female">Female</Option>
        </Select>
      </Form.Item> */}

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default AddEmployeeLayout;
