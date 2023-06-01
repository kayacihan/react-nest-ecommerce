import React, { useContext } from "react";
import { Button, Stack } from "react-bootstrap";
import { ProductContext } from "../context/ProductContext";
import { useShoppingCartContext } from "../context/ShoppingCartContext";

type CartItemProps = {
  id: string;
  quantity: number;
};

const CartItem = ({ id, quantity }: CartItemProps) => {
  const { removeItemFromCart } = useShoppingCartContext();
  const { products } = useContext(ProductContext);

  const item = products.find((storeItem) => storeItem.id === id);

  if (!item) {
    return null;
  }

  return (
    <Stack direction="horizontal" gap={3} className="d-flex align-items-center">
      <img
        src="instrument.svg"
        alt={item.name}
        style={{ width: "120px", height: "70px", objectFit: "cover" }}
      />
      <div className="me-auto">
        <div>
          {item.name}{" "}
          <span className="text-muted" style={{ fontSize: "15px" }}>
            x {quantity}
          </span>
        </div>
        <div className="text-muted">
          $ {parseFloat(item.price.toString()).toFixed(2)}
        </div>
      </div>
      <div>$ {(item.price * quantity).toFixed(2)}</div>
      <Button
        variant="outline-danger"
        size="sm"
        onClick={() => {
          removeItemFromCart(id);
        }}
      >
        X
      </Button>
    </Stack>
  );
};

export default CartItem;
