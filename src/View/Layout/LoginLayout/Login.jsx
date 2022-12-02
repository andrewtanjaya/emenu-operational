import React from "react";
import "./Login.css";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal } from "antd";
import { UserController } from "../../../Controller/UserController";
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
    UserController.getUserByEmail(values.email).then((user) => {
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
    <div className="login-container">
      <h1>Login</h1>
      <div className="login-form-container">
        <Form
          name="normal_login"
          className="login-form"
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 16,
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
          <div className="button-container">
            <Form.Item>
              <Button
                id="loginButton"
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </Button>
            </Form.Item>
            Or <a href="/register">register now!</a>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;
