import React from "react";
import "./Register.css";
import { Button, Form, Input, Modal, Radio } from "antd";
import { Gender } from "../../../Enum/Gender";
import { User } from "../../../Model/User";
import { useNavigate } from "react-router-dom";
import { RoleTypes } from "../../../Enum/RoleTypes";
import { IdTypes } from "../../../Enum/IdTypes";
import { generateRandomId } from "../../../Helper/Helper";
import { UserController } from "../../../Controller/UserController";
import { Restaurant } from "../../../Model/Restaurant";
import { RestaurantAddress } from "../../../Model/RestaurantAddress";
import { RestaurantController } from "../../../Controller/RestaurantController";

function Register() {
  const navigate = useNavigate();
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
    const restaurantId = generateRandomId(IdTypes.RESTAURANT);

    UserController.getUserByEmail(values.email).then((user) => {
      if (user !== null) {
        errorModal(
          "Account Exists",
          `Account with ${values.email} already exists try to login into your account instead`
        );
      } else {
        let newRestaurant = new Restaurant(
          restaurantId,
          values.restaurantName,
          values.restaurantPhoneNumber,
          "",
          "",
          0,
          0,
          Object.assign({}, new RestaurantAddress("", "", "", "", "", "")),
          [],
          []
        );

        let newUser = new User(
          values.firstName,
          values.lastName,
          values.firstName.concat(".", values.lastName),
          values.email,
          RoleTypes.MANAGER,
          restaurantId,
          values.password,
          values.phoneNumber,
          values.gender
        );

        RestaurantController.addRestaurant(newRestaurant);
        UserController.addUser(newUser).then(() => {
          successModal("Success", "Your account successfully created!");
        });
      }
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="register-container">
      <h1 className="registerTitle">Register</h1>
      <div className="register-form-container">
        <Form
          name="basic"
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 14,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
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
            label="Restaurant Phone Number"
            name="restaurantPhoneNumber"
            rules={[
              {
                required: true,
                message: "Restaurant Phone Number must be filled!",
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
            <Input />
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

          <div className="button-container">
            <Form.Item>
              <Button id="registerButton" type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Register;
