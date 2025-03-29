import { Navigate } from "react-router-dom";

const LoginCheck = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to={"/"}></Navigate>;
  }
  return children;
};

export default LoginCheck;
