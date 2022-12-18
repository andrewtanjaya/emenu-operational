import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Row, Card, Col, Menu } from "antd";
import { Avatar, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import AuthConsumer from "../../../hooks/auth";
import "./NavbarUserProfile.css";

function NavbarUserProfile(props) {
  const { Text } = Typography;
  const navigate = useNavigate();
  const [authed, dispatch] = AuthConsumer();

  return (
    <div className="navbar-user-profile-container">
      <div className="navbar-user-profile-left">
        <Avatar className="user-profile-avatar-admin-navbar" icon={<UserOutlined />} />
      </div>
      <div className="navbar-user-profile-right">
        <p>{props.userData.userName}</p>
        <p>{props.userData.roleType}</p>
      </div>

      <ul className="navbar-user-profile-hover-container" style={{margin: 0, padding: 0}}>
        <li>
          <Link to="/admin" style={{ textDecoration: "none", color: "black" }}>
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to="/admin/food"
          >
            Menu
          </Link>
        </li>
        <li>
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to="/admin/transactionReport"
          >
            Report
          </Link>
        </li>
        <li>
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to="/admin/employee"
          >
            Employee
          </Link>
        </li>
        <li>
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to="/admin/setting"
          >
            Restaurant
          </Link>
        </li>
        <li
          onClick={() => {
            sessionStorage.removeItem("userData");
            dispatch({ type: "LOGOUT" });
            navigate("/login");
          }}
        >
          Log Out
        </li>
      </ul>
    </div>
    // <Menu.SubMenu
    //   title={
    //     <Row justify="space-around" align="middle">
    //       <Col>
    //         <Avatar icon={<UserOutlined />} />
    //       </Col>
    //       <Card
    //         bordered={false}
    //         style={{ height: 60 }}
    //         title={
    //           <>
    //             <Row>
    //               <Text>{props.userData.userName}</Text>
    //             </Row>
    //             <Row>
    //               <Text type="secondary">{props.userData.roleType}</Text>
    //             </Row>
    //           </>
    //         }
    //       ></Card>
    //     </Row>
    //   }
    // >
    //   <Menu.Item
    //     key="log-out"
    //
    //   >
    //     <Text type="danger">Log Out</Text>
    //   </Menu.Item>
    // </Menu.SubMenu>
  );
}

export default NavbarUserProfile;
