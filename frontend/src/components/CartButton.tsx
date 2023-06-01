import React from "react";
import { Button } from "react-bootstrap";
import { useShoppingCartContext } from "../context/ShoppingCartContext";
import "./css/cartbutton.css";

const CartButton = () => {
  const { openCart, getItemCount } = useShoppingCartContext();

  return (
    <Button
      className="cart-button"
      variant="outline-primary"
      onClick={openCart}
    >
      <img src="cart.svg" alt="Cart Icon" />
      <div className="cart-badge">{getItemCount()}</div>
    </Button>
  );
};

export default CartButton;
