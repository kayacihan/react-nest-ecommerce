import React, { useContext } from "react";
import { Button, Card } from "react-bootstrap";
import { useShoppingCartContext } from "../context/ShoppingCartContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

type StoreItemProps = {
  id: string;
  name: string;
  price: number;
  photo: string;
  description: string;
};

const StoreItem = ({ id, name, price, description }: StoreItemProps) => {
  const {
    getItemQuantity,
    increaseItemQuantity,
    decreaseItemQuantity,
    removeItemFromCart,
  } = useShoppingCartContext();
  const { isAdmin } = useContext(AuthContext);
  const navigate = useNavigate();

  const quantity = getItemQuantity(id);

  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src="instrument.svg"
        height="200px"
        style={{ objectFit: "fill" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-2">{name}</span>
          <span className="ms-2 text-muted">${price}</span>
        </Card.Title>
        <div>{description}</div>
        <div className="mt-auto">
          {isAdmin ? (
            <div className="mt-auto">
              <br />
              <Button
                className="w-100"
                onClick={() => navigate("/product", { state: { id: id } })}
              >
                Edit Product
              </Button>
            </div>
          ) : (
            <>
              {quantity === 0 ? (
                <Button
                  className="w-100"
                  onClick={() => {
                    increaseItemQuantity(id);
                  }}
                >
                  {" "}
                  + Add To Cart
                </Button>
              ) : (
                <div className="d-flex flex-column align-items-center">
                  <div className="d-flex justify-content-center align-items-center">
                    <Button
                      className="ms-2 me-2"
                      onClick={() => {
                        decreaseItemQuantity(id);
                      }}
                    >
                      -
                    </Button>
                    <div>
                      <span className="fs-2">{quantity}</span>
                    </div>
                    <Button
                      className="ms-2 me-2"
                      onClick={() => {
                        increaseItemQuantity(id);
                      }}
                    >
                      +
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => {
                        removeItemFromCart(id);
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default StoreItem;
