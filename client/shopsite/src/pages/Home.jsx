import React, { useEffect, useState } from "react";
import axios from "../axios";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import '../css/Home.css'

const Home = ({ addToCart }) => {
  const [products, setProducts] = useState([]);

 

  useEffect(() => {
    axios
      .get("/products")
      .then((res) => {
        // Ensure the response has products as an array
        setProducts(res.data || []);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);
  

  return (
    <div className="homepage">
      <h2>Products</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
        {products.map((product) => (
          <div key={product._id} style={{ border: "1px solid #ddd", padding: "10px", borderRadius: "8px", textAlign: "center" }}>
            {/* Display product image */}
            <img src={`http://localhost:5000/uploads/${product.image}`} alt={product.name} width="100" />
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <button onClick={() => addToCart(product._id)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
