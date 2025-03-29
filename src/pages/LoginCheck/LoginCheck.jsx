import { Navigate } from "react-router-dom";
import UsersList from "../UsersList/UsersList";

const LoginCheck = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to={"/"}></Navigate>;
  }
  if (children) {
    return children;
  }
  return <UsersList />;
};

export default LoginCheck;
