import React, { useEffect, useState } from "react";
import axios from "../axios";
import { Container, Card, Button, Form, Row, Col } from "react-bootstrap";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: "", price: ""});
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/products");
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);
  console.log(products);
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };
 

 
  const addProduct = async () => {
    try {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage
      const formData = new FormData();
      formData.append("name", newProduct.name);
      formData.append("price", newProduct.price);
      formData.append("image", image);

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };
      const res = await axios.post("/products", formData, config);
      setProducts([...products, res.data]);
      setNewProduct({ name: "", price: "" });
      setImage(null);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };
  

  const deleteProduct = async (id) => {
    try {
      const token = localStorage.getItem("token"); // Get the token from localStorage (or sessionStorage)
      
      await axios.delete(`/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Attach token in the headers
        },
      });
  
      setProducts(products.filter((p) => p._id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <input
        type="text"
        placeholder="Product Name"
        value={newProduct.name}
        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
      />
      <input
        type="number"
        placeholder="Price"
        value={newProduct.price}
        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
      />
       <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={addProduct}>Add Product</button>
      <div>
        {products.map((product) => (
          <div key={product._id}>
            
                      <img src={`http://localhost:5000/uploads/${product.image}`} alt={product.name} width="100" />
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <button onClick={() => deleteProduct(product._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>

  );
};

export default AdminDashboard;