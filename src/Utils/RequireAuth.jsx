import { Navigate, useLocation } from "react-router-dom";
import AuthConsumer from "./../hooks/auth";

export default function RequireAuth({ children }) {
  const [authed] = AuthConsumer();
  const location = useLocation();

  console.log(authed.auth);
  if (authed.auth === false) {
    authed.auth = sessionStorage.getItem("userData") !== null ? true : false;
  }
  return authed.auth === true ? (
    children
  ) : (
    <Navigate
      to={"/login"}
      replace
      state={{ path: location.pathname }}
    ></Navigate>
  );
}
