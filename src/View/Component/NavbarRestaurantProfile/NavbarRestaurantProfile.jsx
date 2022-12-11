import React from "react";
import { Card } from "antd";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

function NavbarRestaurantProfile(props) {

  return (
    <Card>
        <Avatar icon={<UserOutlined />} />
        {props.restaurantData.restaurantName}
    </Card>
  );
}

export default NavbarRestaurantProfile;
