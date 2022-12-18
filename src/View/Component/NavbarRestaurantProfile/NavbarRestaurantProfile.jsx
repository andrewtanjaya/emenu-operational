import React from "react";
import { Card } from "antd";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "./NavbarRestaurantProfile.css"

function NavbarRestaurantProfile(props) {

  return (
    <div className="navbar-restaurant-profile-container">
      {props.restaurantData.restaurantLogoPicture ? <img className="navbar-restaurant-profile-img" src={props.restaurantData.restaurantLogoPicture} alt="" /> : <Avatar className="navbar-restaurant-profile-img" icon={<UserOutlined/>} />}
        
        
        {props.restaurantData.restaurantName}
    </div>
  );
}

export default NavbarRestaurantProfile;
