import React from "react";
import Link from "react-router-dom";
function CashierNav() {
  return (
    <nav>
      <Link to={""}>Dashboard</Link>
      <Link to={""}>Daily Report</Link>
      <Link to={""}>Generate QrCode</Link>
      <Link to={""}>Cart</Link>
      <Link to={""}>Update Menu Availibility</Link>
    </nav>
  );
}

export default CashierNav;
