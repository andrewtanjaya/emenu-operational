import React from "react";
import { useNavigate } from "react-router-dom";
import { Row, Card, Col, Menu } from "antd";
import { Avatar, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import AuthConsumer from "../../../hooks/auth";

function NavbarRestaurantProfile(props) {
  const { Text } = Typography;
  const navigate = useNavigate();

  console.log(props.restaurantData);
  //   console.log(userName);
  //   console.log(roleType);

  return <Card>{props.restaurantData.restaurantName}</Card>;
}

export default NavbarRestaurantProfile;
