import { useNavigate } from "react-router-dom";

const LoginCheck = ({children}) => {
  const navigate = useNavigate()
  const token = localStorage.getItem("token") || null;
  if (!token) {
    navigate("/");
    return;
  }
  return children;
};

export default LoginCheck;