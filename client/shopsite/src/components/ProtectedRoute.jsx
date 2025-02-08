import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/" />;

  return children;
};

export default ProtectedRoute;
// evide adminte karym edukumbo adminayi kerathe veruthe /admindashboard adichal ie !user loginpage kanam
// admin ayi keriyal admindashboard kanam