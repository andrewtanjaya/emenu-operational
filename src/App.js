import "./App.css";
import { Route, Routes } from "react-router-dom";
import Register from "./View/Layout/RegisterLayout/Register";
import Login  from "./View/Layout/LoginLayout/Login";
import Employees  from "./View/Admin/Employees";
import Foods from "./View/Admin/Foods";
import Setting from "./View/Admin/Setting";
import TransactionReport from "./View/Admin/TransactionReport";
import AdminDashboard from "./View/Admin/AdminDashboard";
import CashierAuth from "./Utils/CashierAuth";
import AdminAuth from "./Utils/AdminAuth";
import KitchenAuth from "./Utils/KitchenAuth";
import GuestAuth from "./Utils/GuestAuth";
import AdminLayout from "./View/Layout/AdminLayout/AdminLayout";

function App() {
  return (
    <>
      <Routes>
        <Route path="/register" element={<GuestAuth><Register /></GuestAuth>} />
        <Route path="/login" element={<GuestAuth><Login /></GuestAuth>} />
        <Route path="/admin" element={<AdminAuth><AdminLayout /></AdminAuth>} >
          <Route index element={<AdminDashboard />} />
          <Route path="/admin/transactionReport" element={<TransactionReport />} />
          <Route path="/admin/employee" element={<Employees />} />
          <Route path="/admin/food" element={<Foods />} />
          <Route path="/admin/setting" element={<Setting />} />
        </Route>
        <Route path="/cashier" element={<CashierAuth><AdminLayout /></CashierAuth>} >
          <Route index element={<AdminDashboard />} />
          <Route path="/cashier/transactionReport" element={<TransactionReport />} />
          <Route path="/cashier/employee" element={<Employees />} />
          <Route path="/cashier/food" element={<Foods />} />
          <Route path="/cashier/setting" element={<Setting />} />
        </Route>
        <Route path="/kitchen" element={<KitchenAuth><AdminLayout /></KitchenAuth>} >
          <Route index element={<AdminDashboard />} />
          <Route path="/kitchen/transactionReport" element={<TransactionReport />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
