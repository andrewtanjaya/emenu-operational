import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Menu } from "antd";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { RestaurantController } from "../../../Controller/RestaurantController";
import { UserController } from "../../../Controller/UserController";
import NavbarRestaurantProfile from "../../Component/NavbarRestaurantProfile/NavbarRestaurantProfile";
import NavbarUserProfile from "../../Component/NavbarUserProfile/NavbarUserProfile";

function KitchenLayout() {
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

  const [currentPath, setCurrentPath] = useState("/kitchen");

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
        <ul className="admin-navbar-item">
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
              style={{ textDecoration: "none", color: "black" }}
              onClick={() => changeActive("/kitchen/menu-availability")}
              className={
                currentPath === "/kitchen/menu-availability" ? "active-nav" : ""
              }
              to="/kitchen/menu-availability"
            >
              Menu
            </Link>
          </li>
        </ul>
        {!userLoading && user ? <NavbarUserProfile userData={user} /> : <></>}
      </div>
    );
  };

  return (
    <div className="kitchen-layout-container">
      {renderNavbar()}
      <div className="kitchen-layout-content-container">
        <Outlet />
      </div>
    </div>
  );
}

export default KitchenLayout;
