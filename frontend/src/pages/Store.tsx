import React, { SetStateAction, useContext, useEffect, useState } from "react";
import { Col, Dropdown, Row } from "react-bootstrap";
import StoreItem from "../components/StoreItem";
import { AuthContext } from "../context/AuthContext";
import { ProductContext } from "../context/ProductContext";

export const Store = () => {
  window.scrollTo(0, 0);

  const [sortOption, setSortOption] = useState("default");
  const [searchTerm, setSearchTerm] = useState("");
  const { isAuthenticated, checkAuthentication } = useContext(AuthContext);
  const { products, getAllProducts } = useContext(ProductContext);

  useEffect(() => {
    checkAuthentication();
    if (isAuthenticated) getAllProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const sortItems = () => {
    const sortedItems = [...products];

    switch (sortOption) {
      case "name-az":
        sortedItems.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-za":
        sortedItems.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "price-lowest":
        sortedItems.sort((a, b) => a.price - b.price);
        break;
      case "price-highest":
        sortedItems.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    const filteredItems = sortedItems.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return filteredItems;
  };

  const handleSearch = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      {isAuthenticated && (
        <>
          <div className="d-flex justify-content-between mb-3">
            <div>
              <input
                type="text"
                placeholder="Search product..."
                onChange={handleSearch}
                className="form-control"
                style={{ width: "300px" }}
              />
            </div>
            <Dropdown align="end">
              <Dropdown.Toggle variant="secondary" id="dropdown-sort">
                Sort By
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item
                  active={sortOption === "default"}
                  onClick={() => setSortOption("default")}
                >
                  Default
                </Dropdown.Item>
                <Dropdown.Item
                  active={sortOption === "name-az"}
                  onClick={() => setSortOption("name-az")}
                >
                  Name A-Z
                </Dropdown.Item>
                <Dropdown.Item
                  active={sortOption === "name-za"}
                  onClick={() => setSortOption("name-za")}
                >
                  Name Z-A
                </Dropdown.Item>
                <Dropdown.Item
                  active={sortOption === "price-lowest"}
                  onClick={() => setSortOption("price-lowest")}
                >
                  Price Lowest
                </Dropdown.Item>
                <Dropdown.Item
                  active={sortOption === "price-highest"}
                  onClick={() => setSortOption("price-highest")}
                >
                  Price Highest
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <Row md={2} xs={1} lg={3} className="g-3">
            {sortItems().map((item) => (
              <Col key={item.id}>
                <StoreItem {...item} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};
