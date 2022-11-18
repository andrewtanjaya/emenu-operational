import React from "react";
import "./Register.css";
import { Button, Form, Input, Modal } from "antd";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { usersRef } from "../../Database/Firebase";
import { getUserByEmail, registerUser } from "../../Controller/UserController";
import { User } from "../../Model/User";
import { RoleTypes } from "../../Enum/RoleTypes";

function Register() {
  const [allUser, isLoadingAllUser, isErrorAllUser] = useCollectionData(
    usersRef,
    {
      idField: "id",
    }
  );

  const error = (title, content) => {
    Modal.error({
      title: title,
      content: content,
    });
  };

  const onFinish = (values) => {
    let newUser = new User(
      values.firstName,
      values.lastName,
      values.firstName + values.lastName,
      values.email,
      RoleTypes.MANAGER,
      "profilePicture:)",
      values.restaurantName,
      values.password
    );

    getUserByEmail(newUser.email).then((user) => {
      if (user !== null) {
        error(
          "Account Exists",
          `Account with ${newUser.email} already exists try to login into your account instead`
        );
      } else {
        registerUser(newUser);
      }
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="registerContainer">
      <h1 className="registerTitle">Register</h1>
      <Form
        name="basic"
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 12,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
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
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Email must be filled!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Restaurant Name"
          name="restaurantName"
          rules={[
            {
              required: true,
              message: "Restaurant Name must be filled!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Email must be filled!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="confirm"
          dependencies={["password"]}
          rules={[
            {
              required: true,
              message: "Email must be filled!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Password does not match!"));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 6,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>

      {allUser && allUser.length !== 0 ? (
        <pre>{JSON.stringify(allUser)}</pre>
      ) : (
        <p>No User</p>
      )}
    </div>
  );
}

export default Register;
