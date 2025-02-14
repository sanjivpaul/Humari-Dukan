import React, { useState, useEffect } from "react";
import Product2 from "../Products/Product2";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removefromcart } from "../../Store/action";

export default function Checkout() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state);

  const [quantities, setQuantities] = useState({});
  const [total, setTotal] = useState(0);

  // Update the quantity and total price
  const handleQuantityChange = (productId, newQuantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: newQuantity,
    }));
  };

  // Remove item from cart
  const handleRemoveFromCart = (product) => {
    const confirmed = window.confirm("Are you sure you want to remove this item?");
    if (confirmed) {
      dispatch(removefromcart(product));
    }
  };

  useEffect(() => {
    const calculateTotal = () => {
      let totalPrice = 0;
      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        const quantity = quantities[item.id] || 1;
        totalPrice += item.cost * quantity;
      }
      return totalPrice.toFixed(2);
    };

    const totalPrice = calculateTotal();
    setTotal(totalPrice);
  }, [quantities, cartItems]);

  return (
    <>
      <div className="cart-container d-flex" style={{ alignItems: "stretch", minHeight: "90vh" }}>
        <div className="w-75 container m-5" style={{ width: "60%" }}>
          <Outlet />
        </div>
        <div className="gift-card w-40 bg-primary p-3" data-bs-theme="light" style={{ width: "40%" }}>
          <div className="cart-item" style={{ maxHeight: "400px", overflow: "auto" }}>
            {cartItems.map((product) => (
              <Product2
                key={product.id}
                id={product.id}
                title={product.title}
                image={product.image}
                cost={product.cost}
                initialQuantity={quantities[product.id] || 1}
                onChange={handleQuantityChange}
                onRemove={() => handleRemoveFromCart(product)}
              />
            ))}
          </div>
          <div className="input-field d-flex m-4 mt-0">
            <input className="form-control form-control my-3" data-bs-theme="light" placeholder="Gift Card or Discount Code" />
            <div className="btn btn-success btn-lg my-3 mx-2">Apply</div>
          </div>
          <div className="d-grid m-4 text-white">
            <div className="row">
              <div className="col">Subtotal</div>
              <div className="col ms-auto">{total}</div>
            </div>
            <div className="row">
              <div className="col">Shipping</div>
              <div className="col ms-auto">Free</div>
            </div>
            <div className="row mt-3">
              <h5 className="col">TOTAL</h5>
              <h5 className="col ms-auto">$ {total}</h5>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
