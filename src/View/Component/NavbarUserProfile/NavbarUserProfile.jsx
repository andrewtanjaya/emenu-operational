import React, { useEffect, useState } from "react";
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
  const [currentPath, setCurrentPath] = useState("/cashier");

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  const changeActive = (url) => {
    setCurrentPath(url);
  };

  const renderCashierDropDown = () => {
    return (
      <ul
        className="navbar-user-profile-hover-container"
        style={{ margin: 0, padding: 0 }}
      >
        <li>
          <Link
            to="/cashier"
            style={{ textDecoration: "none", color: "black" }}
            onClick={() => changeActive("/cashier")}
            className={currentPath === "/cashier" ? "active-nav" : ""}
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            style={{ textDecoration: "none", color: "black" }}
            onClick={() => changeActive("/cashier/menuAvailibility")}
            className={
              currentPath === "/cashier/menuAvailibility" ? "active-nav" : ""
            }
            to="/cashier/menuAvailibility"
          >
            Menu
          </Link>
        </li>
        <li>
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to="/cashier/transactionReport"
            onClick={() => changeActive("/cashier/transactionReport")}
            className={
              currentPath === "/cashier/transactionReport" ? "active-nav" : ""
            }
          >
            Report
          </Link>
        </li>
        <li>
          <Link
            style={{ textDecoration: "none", color: "black" }}
            onClick={() => changeActive("/cashier/cart")}
            to="/cashier/cart"
            className={currentPath === "/cashier/cart" ? "active-nav" : ""}
          >
            Cart
          </Link>
        </li>
        <li>
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to="/cashier/orders"
            onClick={() => changeActive("/cashier/orders")}
            className={currentPath === "/cashier/orders" ? "active-nav" : ""}
          >
            Orders
          </Link>
        </li>
        <li>
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to="/cashier/generateQrCode"
            onClick={() => changeActive("/cashier/generateQrCode")}
            className={
              currentPath === "/cashier/generateQrCode" ? "active-nav" : ""
            }
          >
            QR Codes
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
    );
  };
  const renderManagerDropDown = () => {
    return (
      <ul
        className="navbar-user-profile-hover-container"
        style={{ margin: 0, padding: 0 }}
      >
        <li>
          <Link
            to="/admin"
            style={{ textDecoration: "none", color: "black" }}
            onClick={() => changeActive("/admin")}
            className={currentPath === "/admin" ? "active-nav" : ""}
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            style={{ textDecoration: "none", color: "black" }}
            onClick={() => changeActive("/admin/food")}
            className={currentPath === "/admin/food" ? "active-nav" : ""}
            to="/admin/food"
          >
            Menu
          </Link>
        </li>
        <li>
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to="/admin/transactionReport"
            onClick={() => changeActive("/admin/transactionReport")}
            className={
              currentPath === "/admin/transactionReport" ? "active-nav" : ""
            }
          >
            Report
          </Link>
        </li>
        <li>
          <Link
            style={{ textDecoration: "none", color: "black" }}
            onClick={() => changeActive("/admin/employee")}
            to="/admin/employee"
            className={currentPath === "/admin/employee" ? "active-nav" : ""}
          >
            Employee
          </Link>
        </li>
        <li>
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to="/admin/setting"
            onClick={() => changeActive("/admin/setting")}
            className={currentPath === "/admin/setting" ? "active-nav" : ""}
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
    );
  };

  const renderKitchenDropDown = () => {
    return (
      <ul
        className="navbar-user-profile-hover-container"
        style={{ margin: 0, padding: 0 }}
      >
        <li>
          <Link
            to="/kitchen"
            style={{ textDecoration: "none", color: "black" }}
            onClick={() => changeActive("/kitchen")}
            className={currentPath === "/kitchen" ? "active-nav" : ""}
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/kitchen/menu-availability"
            style={{ textDecoration: "none", color: "black" }}
            onClick={() => changeActive("/kitchen/menu-availability")}
            className={
              currentPath === "/kitchen/menu-availability" ? "active-nav" : ""
            }
          >
            Menu
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
    );
  };

  return (
    <div className="navbar-user-profile-container">
      <div className="navbar-user-profile-left">
        <Avatar
          className="user-profile-avatar-admin-navbar"
          icon={<UserOutlined />}
        />
      </div>
      <div className="navbar-user-profile-right">
        <p>{props.userData.userName}</p>
        <p>{props.userData.roleType}</p>
      </div>

      {props.userData ? (
        props.userData.roleType === "MANAGER" ? (
          renderManagerDropDown()
        ) : props.userData.roleType === "CASHIER" ? (
          renderCashierDropDown()
        ) : props.userData.roleType === "KITCHEN" ? (
          renderKitchenDropDown()
        ) : (
          <></>
        )
      ) : (
        <>LOADING..</>
      )}
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
