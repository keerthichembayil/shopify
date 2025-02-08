import { useState } from "react";
import axios from "../axios";
import { useNavigate } from "react-router-dom";

const Login = ({ setUser,onLogin }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("auth/login", formData);
      localStorage.setItem("token", res.data.token);

      if (res.data.token) {
        onLogin(res.data.token); // Call the function from props to update the token
      }
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setUser(res.data.user); // Update global state
      

      // Redirect based on role
      if (res.data.user.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
