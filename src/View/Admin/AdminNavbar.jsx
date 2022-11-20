import React from "react";
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import { RoleTypes } from "../../Enum/RoleTypes";
import AuthConsumer from "../../hooks/auth";

function AdminNavbar() {
  const navigate = useNavigate();
  return (
    <div>
      <nav>
        <Link to="/">Dashboard</Link>
        <Link to="/transactionReport">Transaction Report</Link>
        <Link to={"/employee"}>Employee</Link>
        <Link to={"/food"}>Food</Link>
        <Link to={"/setting"}>Setting</Link>
      </nav>
      <button
        onClick={() => {
          sessionStorage.removeItem("userData");
          navigate("/login");
        }}
      >
        Logout
      </button>
      <br />
      <Outlet />
    </div>
  );
}

export default AdminNavbar;
