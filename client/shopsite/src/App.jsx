// src/App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AdminDashboard from "./pages/Admindashboard";
import Cart from "./pages/Cart";

import Login from "./components/Login";
import Logout from "./components/Logout";
import Register from "./components/Register";
import axios from "./axios";
import ProtectedRoute from "./components/ProtectedRoute";

import 'bootstrap/dist/css/bootstrap.min.css';

// evide token ie new when user login cheyumbolum cart update cheyumbolum cart state update avanam 
// aa cart state localStorage set avanam and so useEffect token change avumbol ie user login
// cheyumbol and calling fetch cart when cart change

const App = () => {
  
  const [user, setUser] = useState(null); 
  const[cartcount,setCartCount]=useState(0);
  const [token, setToken] = useState(null);//token local ilniuum edukkanna reethyil ezhtuhiyal logout cheyan marannalum 
  // addto cart work avum ath venda
  console.log("user",user);
  console.log("token",token);
 
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });
  console.log(cart);

 

  const handleLogin = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken); // This will trigger cart re-fetch in useEffect
    // login cheyumbol token and user set avum user avide set cheyum  token evideyum ,local and state
  };

  // Logout function
  const handleLogout = (navigate) => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null); // Clear user state
    setToken(null);
  
    // Ensure navigate is called only once
    if (navigate) {
      navigate("/login");
    }
  };
  // authcontroller il response return cheyuth user object anu athil ella userdertails unde UNSAFE_createClientRoutesWithHMRRevalidationOptOut,role
  



    

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("called first token useeffct");
    if (!token) {
      setCart([]);  // Ensure cart is empty if user is not logged in allenkil user login cheythilenkilum
      // cart count kanikum appol sync avilla
      
      localStorage.removeItem("cart");
      
      return;  // Exit early to prevent API call
    }
  
    axios.get("/cart", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.data && res.data.items) {
          setCart(res.data);
          // evide response il full venda items mathram eduth set akki so cart contain items array of objects
          const totalQuantity = res.data.items.reduce((sum, item) => sum + item.quantity, 0);
          setCartCount(totalQuantity);
          console.log("cart",cart);
          localStorage.setItem("cart", JSON.stringify(res.data));
        
        } else {
          setCart([]);
          setCartCount(0);
          localStorage.removeItem("cart");
         
        }
      })
      .catch((err) => console.log(err));
  }, [token]); 
  // this useEffect should run for each user when login login cheyumbo cart
  // value edukkanam ie token login cheyumbo change avum



  const fetchCart = async () => {
    const token = localStorage.getItem("token");
    console.log("called fetchcart");
    if (!token) {
      setCart([]);
      setCartCount(0);
      localStorage.removeItem("cart");
      return;
    }
  
    try {
      const res = await axios.get("/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (res.data && res.data.items) {
        setCart(res.data);
        const totalQuantity = res.data.items.reduce((sum, item) => sum + item.quantity, 0);
        setCartCount(totalQuantity);
        localStorage.setItem("cart", JSON.stringify(res.data));
      } else {
        setCart([]);
        setCartCount(0);
        localStorage.removeItem("cart");
      }
    } catch (err) {
      console.log(err);
    }
  };
  

 // Call fetchCart when the user logs in
useEffect(() => {
  fetchCart();
}, []); // Run once when the component mounts
  
  const addToCart = async (productId) => {
   
    if (!token) {
      alert("You must be logged in to add to cart.");
      return; // Stop here
    }
    try {
      const res = await axios.post("/cart", { productId }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Cart response:", res.data);
  
      setCart(res.data);
      const totalQuantity = res.data.items.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(totalQuantity);
      localStorage.setItem("cart", JSON.stringify(res.data));
      fetchCart();
      alert("item added to cart");
      
    } catch (err) {
      if (err.response) {
        if (err.response.status === 401) {
          alert("Unauthorized! Please log in.");
        } else if (err.response.status === 404) {
          alert("Product not found.");
        } else {
          alert("Something went wrong. Please try again.");
        }
      } else {
        console.error("Error response:", err.response?.data || err.message);
        // console.log("Error:", err);
      }
    }
  };
  

  const removeFromCart = (id) => {
    console.log("id",id);
    const token = localStorage.getItem("token");
    axios.delete(`/cart/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setCart(res.data);
        const totalQuantity = res.data.items.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(totalQuantity);
    localStorage.setItem("cart", JSON.stringify(res.data));
    
    // localStorage.setItem("cartCount", JSON.stringify(totalQuantity));
    fetchCart();
      })
      .catch((err) => console.log(err));
  };
  

  return (
    <Router>
      <Navbar cartCount={cartcount} user={user} />
      <Routes>
        <Route path="/" element={<Home addToCart={addToCart} />} />
        <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} />} />
    
        <Route path="/login" element={<Login setUser={setUser}  onLogin={handleLogin}/>} />
        <Route path="/logout" element={<Logout  onLogout={handleLogout} />} />
        <Route path="/register" element={<Register />} />
      
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute role="user">
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
