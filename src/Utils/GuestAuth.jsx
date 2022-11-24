import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { RoleTypes } from "../Enum/RoleTypes";
import AuthConsumer from "./../hooks/auth";

export default function GuestAuth({ children }) {
  const [authed] = AuthConsumer();
  const location = useLocation();
  const currentUser = JSON.parse(sessionStorage.getItem("userData"));
  let pathName;

  if (currentUser) {
    if (currentUser.roleType === RoleTypes.CASHIER) {
      pathName = "/cashier";
    } else if (currentUser.roleType === RoleTypes.KITCHEN) {
      pathName = "/kitchen";
    } else if (currentUser.roleType === RoleTypes.MANAGER) {
      pathName = "/admin";
    }
  }
  if (authed.auth === false) {
    authed.auth = sessionStorage.getItem("userData") !== null ? true : false;
  }
  return authed.auth === false ? (
    children
  ) : (
    <Navigate
      to={pathName}
      replace
      state={{ path: location.pathname }}
    ></Navigate>
  );
}
