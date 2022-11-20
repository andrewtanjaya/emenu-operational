import "./App.css";
import { Route, Routes } from "react-router-dom";
import Register from "./View/Register/Register";
import Login  from "./View/Login/Login";
import AdminNavbar from "./View/Admin/AdminNavbar";
import Employees  from "./View/Admin/Employees";
import Foods from "./View/Admin/Foods";
import Setting from "./View/Admin/Setting";
import TransactionReport from "./View/Admin/TransactionReport";
import AdminDashboard from "./View/Admin/AdminDashboard";
import RequireAuth from "./Utils/RequireAuth";

function App() {
  return (
    <>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<RequireAuth><AdminNavbar /></RequireAuth>} >
        <Route index element={<AdminDashboard />} />
          <Route path="/transactionReport" element={<TransactionReport />} />
          <Route path="/employee" element={<Employees />} />
          <Route path="/food" element={<Foods />} />
          <Route path="/setting" element={<Setting />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
