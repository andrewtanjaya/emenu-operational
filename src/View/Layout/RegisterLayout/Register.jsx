import React from "react";
import "./Register.css";
import { Button, Form, Input, Modal, Radio } from "antd";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { usersRef } from "../../../Config/Firebase";
import {
  getUserByEmail,
  registerUser,
} from "../../../Controller/UserController";
import { User } from "../../../Model/User";
import { RoleTypes } from "../../../Enum/RoleTypes";
import { Gender } from "../../../Enum/Gender";
import { generateRandomId } from "../../../Helper/Helper";
import { IdTypes } from "../../../Enum/IdTypes";
import { addRestaurant } from "../../../Controller/RestaurantController";
import { Restaurant } from "../../../Model/Restaurant";
import { Menu } from "../../../Model/Menu";
import { addMenu } from "../../../Controller/MenuController";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [allUser, isLoadingAllUser, isErrorAllUser] = useCollectionData(
    usersRef,
    {
      idField: "id",
    }
  );

  const errorModal = (title, content) => {
    Modal.error({
      title: title,
      content: content,
    });
  };

  const successModal = (title, content) => {
    Modal.success({
      onOk: () => {
        navigate("/login");
      },
      title: title,
      content: content,
    });
  };

  const onFinish = (values) => {
    const getRestoId = generateRandomId(IdTypes.RESTAURANT, "");
    const getMenuId = generateRandomId(IdTypes.MENU, "");

    let newUser = new User(
      values.firstName,
      values.lastName,
      values.firstName + values.lastName,
      values.email,
      RoleTypes.MANAGER,
      "profilePicture:)",
      "",
      values.password,
      values.phoneNumber,
      values.gender
    );

    getUserByEmail(newUser.email).then((user) => {
      if (user !== null) {
        errorModal(
          "Account Exists",
          `Account with ${newUser.email} already exists try to login into your account instead`
        );
      } else {
        getMenuId.then((menuId) => {
          const newMenu = new Menu(menuId, [], []);
          addMenu(newMenu);
          getRestoId.then((id) => {
            const newResto = new Restaurant(
              id,
              values.restaurantName,
              menuId,
              [],
              "",
              "",
              0,
              0,
              []
            );
            addRestaurant(newResto);
            newUser.restaurantId = id;
            registerUser(newUser).then(() => {
              successModal("Success", "Your account successfully created!");
            });
          });
        });
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
