import React from "react";
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import AuthConsumer from "../../../hooks/auth";
import './AdminLayout.css'

function AdminLayout() {
  const navigate = useNavigate();
  const [authed, dispatch] = AuthConsumer();
  return (
    <div>
      <nav>
        <Link to="/admin">Dashboard</Link>
        <Link to="/admin/transactionReport">Transaction Report</Link>
        <Link to={"/admin/employee"}>Employee</Link>
        <Link to={"/admin/food"}>Food</Link>
        <Link to={"/admin/setting"}>Setting</Link>
      </nav>
      <button
        onClick={() => {
          sessionStorage.removeItem("userData");
          dispatch({ type: "LOGOUT" });
          navigate("/login");
        }}
      >
        Logout
      </button>
      <br />
      <div className="admin-layout-container">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
