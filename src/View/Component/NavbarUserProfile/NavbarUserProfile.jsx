import React from "react";
import { useNavigate } from "react-router-dom";
import { Row, Card, Col, Menu } from "antd";
import { Avatar, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import AuthConsumer from "../../../hooks/auth";

function NavbarUserProfile(props) {
  const { Text } = Typography;
  const navigate = useNavigate();
  const [authed, dispatch] = AuthConsumer();

  return (
    <Menu.SubMenu
      title={
        <Row justify="space-around" align="middle">
          <Col>
            <Avatar icon={<UserOutlined />} />
          </Col>
          <Card
            bordered={false}
            style={{ height: 60 }}
            title={
              <>
                <Row>
                  <Text>{props.userData.userName}</Text>
                </Row>
                <Row>
                  <Text type="secondary">{props.userData.roleType}</Text>
                </Row>
              </>
            }
          ></Card>
        </Row>
      }
    >
      <Menu.Item
        key="log-out"
        onClick={() => {
          sessionStorage.removeItem("userData");
          dispatch({ type: "LOGOUT" });
          navigate("/login");
        }}
      >
        <Text type="danger">Log Out</Text>
      </Menu.Item>
    </Menu.SubMenu>
  );
}

export default NavbarUserProfile;
