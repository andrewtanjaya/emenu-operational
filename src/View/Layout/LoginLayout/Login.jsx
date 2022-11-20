import React from "react";
import "./Login.css";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal } from "antd";
import { getUserByEmail } from "../../../Controller/UserController";
import { useNavigate } from "react-router-dom";
import AuthConsumer from "../../../hooks/auth";

function Login() {
  const navigate = useNavigate();
  const [authed, dispatch] = AuthConsumer();

  const error = (title, content) => {
    Modal.error({
      title: title,
      content: content,
    });
  };

  const onFinish = (values) => {
    getUserByEmail(values.email).then((user) => {
      if (user) {
        validateUser(values, user);
      } else {
        error(
          "Account does not exists!",
          `Account with ${values.email} does not exists!`
        );
      }
    });
  };

  function validateUser(values, user) {
    if (values.password === user.password) {
      let userData = {
        email: user.email,
        roleType: user.roleType,
        restaurantId: user.restaurantId,
      };

      dispatch({ type: "LOGIN" });
      window.sessionStorage.setItem("userData", JSON.stringify(userData));

      navigate("/admin", { replace: true });
    } else {
      error("Wrong Password");
    }
  }

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="loginContainer">
      <h1>Login</h1>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          Or <a href="/register">register now!</a>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Login;
