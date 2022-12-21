import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Register from "./View/Layout/RegisterLayout/Register";
import Login from "./View/Layout/LoginLayout/Login";
import AdminDashboard from "./View/Admin/AdminDashboard";
import CashierAuth from "./Utils/CashierAuth";
import AdminAuth from "./Utils/AdminAuth";
import KitchenAuth from "./Utils/KitchenAuth";
import GuestAuth from "./Utils/GuestAuth";
import AdminLayout from "./View/Layout/AdminLayout/AdminLayout";
import CashierLayout from "./View/Layout/CashierLayout/CashierLayout";
import KitchenLayout from "./View/Layout/KitchenLayout/KitchenLayout";
import AddEmployeeLayout from "./View/Layout/AddEmployeeLayout/AddEmployeeLayout";
import ViewEmployeeLayout from "./View/Layout/ViewEmployeeLayout/ViewEmployeeLayout";
import AdminAddMenuLayout from "./View/Layout/AdminAddMenuLayout/AdminAddMenuLayout";
import EditEmployeeLayout from "./View/Layout/EditEmployeeLayout/EditEmployeeLayout";
import RestaurantSetting from "./View/Layout/RestaurantSettingLayout/RestaurantSetting";
import AdminTransactionReport from "./View/Layout/AdminTransactionReport/AdminTransactionReport";
import CashierKitchenUpdateMenuAvailableLayout from "./View/Layout/CashierKitchenUpdateMenuAvailableLayout/CashierKitchenUpdateMenuAvailableLayout";
import ViewMenuLayout from "./View/Layout/ViewMenuLayout/ViewMenuLayout";
import { Button, Result } from "antd";
import KitchenOrderQueueLayout from "./View/Layout/KitchenOrderQueueLayout/KitchenOrderQueueLayout";
import AddFoodLayout from "./View/Layout/AddFoodLayout/AddFoodLayout";
import EditFoodLayout from "./View/Layout/EditFoodLayout/EditFoodLayout";
import CashierDashboardLayout from "./View/Layout/CashierDashboardLayout/CashierDashboardLayout";
import GenerateQrCodeLayout from "./View/Layout/CashierGenerateQrCodeLayout/GenerateQrCodeLayout";
import AdminDashboardLayout from "./View/Layout/AdminDashboardLayout/AdminDashboardLayout";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route
          path="/register"
          element={
            <GuestAuth>
              <Register />
            </GuestAuth>
          }
        />
        <Route
          path="/login"
          element={
            <GuestAuth>
              <Login />
            </GuestAuth>
          }
        />
        <Route
          path="/admin"
          element={
            <AdminAuth>
              <AdminLayout />
            </AdminAuth>
          }
        >
          <Route index element={<AdminDashboardLayout />} />
          <Route
            path="/admin/transactionReport"
            element={<AdminTransactionReport />}
          />
          <Route path="/admin/employee" element={<ViewEmployeeLayout />} />
          <Route path="/admin/addEmployee" element={<AddEmployeeLayout />} />
          <Route path="/admin/editEmployee" element={<EditEmployeeLayout />} />
          <Route path="/admin/food" element={<ViewMenuLayout />} />
          <Route path="/admin/addFood" element={<AddFoodLayout />} />
          <Route path="/admin/editFood" element={<EditFoodLayout />} />
          <Route path="/admin/setting" element={<RestaurantSetting />} />
          <Route path="/admin/menu" element={<ViewMenuLayout />} />
        </Route>
        <Route
          path="/cashier"
          element={
            <CashierAuth>
              <CashierLayout />
            </CashierAuth>
          }
        >
          <Route index element={<CashierDashboardLayout />} />
          <Route
            path="/cashier/menuAvailibility"
            element={<CashierKitchenUpdateMenuAvailableLayout />}
          />
          <Route
            path="/cashier/generateQrCode"
            element={<GenerateQrCodeLayout />}
          />
        </Route>
        <Route
          path="/kitchen"
          element={
            <KitchenAuth>
              <KitchenLayout />
            </KitchenAuth>
          }
        >
          <Route index element={<KitchenOrderQueueLayout />} />
          <Route
            path="/kitchen/menu"
            element={<CashierKitchenUpdateMenuAvailableLayout />}
          />
        </Route>
        <Route
          path="*"
          element={
            <Result
              status="404"
              title="404"
              subTitle="Sorry, the page you visited does not exist."
              extra={<Button type="primary">Back Home</Button>}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
