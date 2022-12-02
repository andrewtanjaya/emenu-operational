import React from "react";
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import AuthConsumer from "../../../hooks/auth";

function KitchenLayout() {
  const navigate = useNavigate();
  const [authed, dispatch] = AuthConsumer();
  return (
    <div className="kitchen-layout-container">
      <nav>
        <Link to="/admin">Dashboard</Link>
        ---
        <Link to="/admin/transactionReport">Transaction Report</Link>
        ---
        <Link to={"/admin/employee"}>Employee</Link>
        ---
        <Link to={"/admin/food"}>Food</Link>
        ---
        <Link to={"/admin/setting"}>Setting</Link>
        ---
        <button
          onClick={() => {
            sessionStorage.removeItem("userData");
            dispatch({ type: "LOGOUT" });
            navigate("/login");
          }}
        >
          Logout
        </button>
      </nav>
      <br />
      <div className="kitchen-layout-content-container">
        <Outlet />
      </div>
    </div>
  );
}

export default KitchenLayout;
