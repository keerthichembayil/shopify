import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = ({ onLogout }) => {
  const navigate = useNavigate();

  useEffect(() => {
    onLogout(navigate); // Pass navigate to handleLogout
  }, [onLogout, navigate]);


  return null; // No UI needed
};

export default Logout;