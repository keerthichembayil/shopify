import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

const Cart = ({ cart, removeFromCart }) => {
  // Calculate total price using nested price inside productId
  //evide the thing i understood is that when we pass props the component rerenders so no need 
  // of sepearate useEffect when removeFromCart
  const totalPrice = cart.items.reduce((acc, item) => acc + item.productId.price * item.quantity, 0);
  // const totalPrice = cart?.items?.reduce((acc, item) => acc + item.productId.price * item.quantity, 0) || 0;

  console.log("cart",cart);
console.log(totalPrice);
  return (
    <div className="container mt-4">
      <h2>Your Cart</h2>
      {cart?.items.length === 0 ? (
        <p>Your cart is empty. <Link to="/">Shop now</Link></p>
      ) : (
        <>
          {cart?.items?.map((item) => (
            <Card key={item._id} className="mb-3 p-3">
              <div className="d-flex align-items-center">
                <img src={`http://localhost:5000/uploads/${item.productId.image}`} alt={item.name} style={{ width: "80px", height: "80px", marginRight: "15px" }} />
                <div>
                  <h5>{item.productId.name}</h5>
                  <p>Price: ${item.productId.price}</p>
                  <p>Quantity: {item.quantity}</p>
                  <Button variant="danger" onClick={() => removeFromCart(item._id)}>Remove</Button>
                </div>
              </div>
            </Card>
          ))}
          <h4>Total: ${totalPrice.toFixed(2)}</h4>
          <Link to="/checkout" className="btn btn-success">Proceed to Checkout</Link>
        </>
      )}
    </div>
  );
};

export default Cart;
