import React, { useState } from "react";
import "./Login.css";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal } from "antd";
import { UserController } from "../../../Controller/UserController";
import { Link, useNavigate } from "react-router-dom";
import AuthConsumer from "../../../hooks/auth";

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [authed, dispatch] = AuthConsumer();

  const error = (title, content) => {
    Modal.error({
      title: title,
      content: content,
    });
  };

  const onFinish = (values) => {
    setLoading(true);
    UserController.getUserByEmail(values.email).then((user) => {
      if (user) {
        validateUser(values, user);
      } else {
        error(
          "Account does not exists!",
          `Account with ${values.email} does not exists!`
        );
      }
      setLoading(false);
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
      Modal.error({
        title: "Sign in Failed",
        content: "Please try again with valid credential",
      });
    }
  }

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="login-container">
      <div className="login-form-container">
      <h1>Welcome back</h1>
        <Form
          name="normal_login"
          className="login-form"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          layout="vertical"
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
              placeholder="Enter your email"
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
              type="password"
              placeholder="Enter your password"
            />
          </Form.Item>
          <div className="button-container">
            <Form.Item>
              <Button
                loading={loading}
                id="loginButton"
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                SIGN IN
              </Button>
            </Form.Item>
            
          </div>
        </Form>
        <p>Don't have an account? <Link to="/register" style={{color:"black"}}>Sign up here</Link></p>
      </div>
    </div>
  );
}

export default Login;
