import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
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
import AddEmployeeLayout from "./View/Layout/AddEmployeeLayout/AddEmployeeLayout";
import ViewEmployeeLayout from "./View/Layout/ViewEmployeeLayout/ViewEmployeeLayout";
import AdminAddMenuLayout from "./View/Layout/AdminAddMenuLayout/AdminAddMenuLayout";
import EditEmployeeLayout from "./View/Layout/EditEmployeeLayout/EditEmployeeLayout";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />}/>
        <Route path="/register" element={<GuestAuth><Register /></GuestAuth>} />
        <Route path="/login" element={<GuestAuth><Login /></GuestAuth>} />
        <Route path="/admin" element={<AdminAuth><AdminLayout /></AdminAuth>} >
          <Route index element={<AdminDashboard />} />
          <Route path="/admin/transactionReport" element={<TransactionReport />} />
          <Route path="/admin/employee" element={<ViewEmployeeLayout />} />
          <Route path="/admin/addEmployee" element={<AddEmployeeLayout />} />
          <Route path="/admin/editEmployee/:userId" element={<EditEmployeeLayout />} />
          <Route path="/admin/food" element={<Foods />} />
          <Route path="/admin/addFood" element={<AdminAddMenuLayout/>}/>
          <Route path="/admin/editFood" element={<AdminAddMenuLayout/>}/>
          <Route path="/admin/setting" element={<Setting />} />
        </Route>
        <Route path="/cashier" element={<CashierAuth><AdminLayout /></CashierAuth>} >
        </Route>
        <Route path="/kitchen" element={<KitchenAuth><AdminLayout /></KitchenAuth>} >
        </Route>
        <Route path="*" element={(<h1>Page Not Found</h1>)}/>
      </Routes>
    </>
  );
}

export default App;
