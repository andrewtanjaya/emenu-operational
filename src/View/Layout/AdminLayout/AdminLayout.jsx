import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import AuthConsumer from "../../../hooks/auth";
import "./AdminLayout.css";

function AdminLayout() {
  const navigate = useNavigate();
  const [authed, dispatch] = AuthConsumer();
  return (
    <div className="admin-layout-container">
      <nav>
        <Link to="/admin">Dashboard</Link>
        ---
        <Link to="/admin/transactionReport">Transaction Report</Link>
        ---
        <Link to={"/admin/employee"}>Employee</Link>
        ---
        <Link to={"/admin/menu"}>Menu</Link>
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
      <div className="admin-layout-content-container">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
