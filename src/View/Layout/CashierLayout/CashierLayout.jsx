import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import AuthConsumer from "../../../hooks/auth";
import { Menu, Input, Space } from "antd";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { RestaurantController } from "../../../Controller/RestaurantController";
import { UserController } from "../../../Controller/UserController";
import NavbarRestaurantProfile from "../../Component/NavbarRestaurantProfile/NavbarRestaurantProfile";
import NavbarUserProfile from "../../Component/NavbarUserProfile/NavbarUserProfile";
import "./CashierLayout.css";
import { CloseOutlined, SearchOutlined } from "@ant-design/icons";

function CashierLayout() {
  const data = JSON.parse(sessionStorage.getItem("userData"));
  const [showSearch, setShowSearch] = useState(false);
  const { Search } = Input;
  const [user, userLoading, userError, userSnapshot] = useDocumentData(
    UserController.getUserProfileByEmail(data.email),
    {
      idField: "id",
    }
  );
  const [restaurant, restaurantLoading, restaurantError, restaurantSnapshot] =
    useDocumentData(
      RestaurantController.getRestaurantProfileById(data.restaurantId),
      {
        idField: "id",
      }
    );

  const onSearch = (value) => {
    return console.log();
  };

  const [currentPath, setCurrentPath] = useState("/cashier");

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  const changeActive = (url) => {
    setCurrentPath(url);
  };

  const renderNavbar = () => {
    return (
      <div className="admin-restaurant-navbar">
        {!restaurantLoading && restaurant ? (
          <NavbarRestaurantProfile restaurantData={restaurant} />
        ) : (
          <></>
        )}
        <div className="navbar-item-container">
          <div
            className={
              showSearch
                ? "search-bar-navbar-container show-search-bar"
                : "search-bar-navbar-container"
            }
          >
            <input
              className="search-input-cashier-navbar"
              type="text"
              placeholder="Search order or menu..."
            />
            <CloseOutlined
              onClick={() => setShowSearch(false)}
              className="close-search-navbar-icon"
            />
          </div>

          <ul className="admin-navbar-item">
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
                  currentPath === "/cashier/menuAvailibility"
                    ? "active-nav"
                    : ""
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
                  currentPath === "/cashier/transactionReport"
                    ? "active-nav"
                    : ""
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
                className={
                  currentPath === "/cashier/orders" ? "active-nav" : ""
                }
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
              onClick={() => setShowSearch(true)}
              style={{ padding: 0, margin: "0 6px" }}
              className="navbar-search-icon"
            >
              <SearchOutlined className="search-icon-cashier-navbar" />
            </li>
          </ul>
          <div
              onClick={() => setShowSearch(true)}
              style={{ padding: 0, margin: "0 6px" }}
              className="navbar-search-icon-small"
            >
              <SearchOutlined className="search-icon-cashier-navbar" />
            </div>
        </div>
        {!userLoading && user ? <NavbarUserProfile userData={user} /> : <></>}
      </div>
      // <nav>
      //   <Menu className="navbar" mode={"horizontal"}>
      //     {!restaurantLoading ? (
      //       <NavbarRestaurantProfile restaurantData={restaurant} />
      //     ) : (
      //       <></>
      //     )}
      //     <Search
      //       placeholder="Search order or menu"
      //       allowClear
      //       onSearch={onSearch}
      //       style={{
      //         width: 250,
      //       }}
      //     />
      //     <Menu.Item key="dashboard">
      //       <Link to="/cashier">Dashboard</Link>
      //     </Menu.Item>
      //     <Menu.Item key="menu">
      //       <Link to="/cashier/menuAvailibility">Menu</Link>
      //     </Menu.Item>
      //     <Menu.Item key="report">
      //       <Link to="/cashier/report">Report</Link>
      //     </Menu.Item>
      //     <Menu.Item key="cart">
      //       <Link to="/cashier/cart">Cart</Link>
      //     </Menu.Item>
      //     <Menu.Item key="orders">
      //       <Link to="/cashier/orders">Orders</Link>
      //     </Menu.Item>
      //     <Menu.Item key="qrCode">
      //       <Link to="/cashier/generateQrCode">QR Code</Link>
      //     </Menu.Item>
      //     {!userLoading ? <NavbarUserProfile userData={user} /> : <></>}
      //   </Menu>
      // </nav>
    );
  };

  return (
    <div className="cashier-layout-container">
      {renderNavbar()}
      <div className="cashier-layout-content-container">
        <Outlet />
      </div>
    </div>
  );
}

export default CashierLayout;
