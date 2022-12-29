import { Menu, Row, Col, Layout } from "antd";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { Link, Outlet } from "react-router-dom";
import { RestaurantController } from "../../../Controller/RestaurantController";
import { UserController } from "../../../Controller/UserController";
import NavbarRestaurantProfile from "../../Component/NavbarRestaurantProfile/NavbarRestaurantProfile";
import NavbarUserProfile from "../../Component/NavbarUserProfile/NavbarUserProfile";
import "./AdminLayout.css";

function AdminLayout() {
  const data = JSON.parse(sessionStorage.getItem("userData"));
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

  const [currentPath, setCurrentPath] = useState("/admin");


  useEffect(()=>{
    setCurrentPath(window.location.pathname);
  }, [])
  
  const changeActive = (url) => {
    setCurrentPath(url)
  }

  const renderNavbar = () => {
    return (
      <div className="admin-restaurant-navbar">
        {!restaurantLoading && restaurant ? (
          <NavbarRestaurantProfile restaurantData={restaurant} />
        ) : (
          <></>
        )}
        <ul className="admin-navbar-item">
          <li>
            <Link
              to="/admin"
              style={{ textDecoration: "none", color: "black" }}
              onClick={() => changeActive("/admin")}
              className={
                currentPath === "/admin" ? "active-nav" : ""
              }
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none", color: "black" }}
              onClick={() => changeActive("/admin/food")}
              className={
                currentPath === "/admin/food" ? "active-nav" : ""
              }
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
                currentPath === "/admin/transactionReport"
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
              onClick={() => changeActive("/admin/employee")}
              to="/admin/employee"
              className={
                currentPath === "/admin/employee"
                  ? "active-nav"
                  : ""
              }
            >
              Employee
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none", color: "black"  }}
              to="/admin/setting"
              onClick={() => changeActive("/admin/setting")}
              className={
                currentPath === "/admin/setting"
                  ? "active-nav"
                  : ""
              }
            >
              Restaurant
            </Link>
          </li>
        </ul>
        {!userLoading && user ? <NavbarUserProfile userData={user} /> : <></>}
      </div>
    );
  };

  return (
    <div className="admin-layout-content-container">
      {renderNavbar()}
      <div className="admin-layout-content">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
