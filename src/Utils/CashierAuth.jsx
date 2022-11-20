import { Navigate, useLocation } from "react-router-dom";
import { RoleTypes } from "../Enum/RoleTypes";
import AuthConsumer from "./../hooks/auth";

export default function CashierAuth({ children }) {
  const [authed] = AuthConsumer();
  const location = useLocation();
  const currentUser = JSON.parse(sessionStorage.getItem("userData"));
  let pathName;

  if (currentUser) {
    if (currentUser.roleType === RoleTypes.MANAGER) {
      pathName = "/admin";
    } else if (currentUser.roleType === RoleTypes.KITCHEN) {
      pathName = "/kitchen";
    }
  } else {
    pathName = "/login";
  }

  if (authed.auth === false) {
    authed.auth = sessionStorage.getItem("userData") !== null ? true : false;
  }

  return authed.auth === true && currentUser.roleType === RoleTypes.CASHIER ? (
    children
  ) : (
    <Navigate
      to={pathName}
      replace
      state={{ path: location.pathname }}
    ></Navigate>
  );
}
