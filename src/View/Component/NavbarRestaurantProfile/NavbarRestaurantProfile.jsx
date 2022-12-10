import React from "react";
import { useNavigate } from "react-router-dom";
import { Row, Card, Col, Menu } from "antd";
import { Avatar, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import AuthConsumer from "../../../hooks/auth";

function NavbarRestaurantProfile(props) {
  const { Text } = Typography;
  const navigate = useNavigate();

  return (
    <Card>
        <Avatar icon={<UserOutlined />} />
        {props.restaurantData.restaurantName}
    </Card>
  );
}

export default NavbarRestaurantProfile;
