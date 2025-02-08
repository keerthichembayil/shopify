import { useState } from "react";
import axios from "../axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      const res = await axios.post("auth/register", formData);
      alert(res.data.message);
      navigate("/login"); // Redirect to login after registration
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div>
    <h2>Register</h2>
    {error && <p style={{ color: "red" }}>{error}</p>}
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        name="username" 
        placeholder="UserName" 
        value={formData.username} 
        onChange={handleChange} 
        required 
      />
      <input 
        type="email" 
        name="email" 
        placeholder="Email" 
        value={formData.email} 
        onChange={handleChange} 
        required 
      />
      <input 
        type="password" 
        name="password" 
        placeholder="Password" 
        value={formData.password} 
        onChange={handleChange} 
        required 
      />
      <button type="submit">Register</button>
    </form>
  </div>
  );
};

export default Register;
