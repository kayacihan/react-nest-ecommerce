import React, { useContext, useEffect } from "react";
import { Offcanvas, Stack, Button } from "react-bootstrap";
import { useShoppingCartContext } from "../context/ShoppingCartContext";
import { ProductContext } from "../context/ProductContext";
import { AuthContext } from "../context/AuthContext";
import OrderDataService from "../services/http/orders.service";
import { OrderDto } from "../context/interfaces/order.type";
import CartItem from "./CartItem";

type ShoppingCartProps = {
  isOpen: boolean;
};

const ShoppingCart = ({ isOpen }: ShoppingCartProps) => {
  const { closeCart, cartItems, buyProducts } = useShoppingCartContext();
  const { products, getAllProducts } = useContext(ProductContext);
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (cartItems.length > 0) getAllProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems, isAuthenticated]);

  const total = cartItems
    .reduce((totalPrice, cartItem) => {
      const foundItem = products.find((item) => item.id === cartItem.id);
      totalPrice += (foundItem?.price || 0) * cartItem.quantity;
      return totalPrice;
    }, 0)
    .toFixed(2);

  const handleCreateOrder = async () => {
    try {
      const orderDto: OrderDto = {
        address: "address",
        date: new Date().toDateString(),
        products: [...cartItems],
      };

      await OrderDataService.createOrder(orderDto);
      buyProducts();
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  return (
    <Offcanvas show={isOpen} placement="end" onHide={closeCart}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
          {+total > 0 && (
            <>
              <div className="ms-auto fw-bold fs-5">Total: ${total}</div>
              <Button
                variant="primary"
                size="sm"
                className="w-100"
                onClick={handleCreateOrder}
              >
                Buy
              </Button>
            </>
          )}
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default ShoppingCart;
