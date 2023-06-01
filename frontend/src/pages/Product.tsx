import React, { useState, useEffect, useContext } from "react";
import "../components/css/product.css";
import { CreateProductDto, Product } from "../context/interfaces/product.type";
import ProductDataService from "../services/http/products.service";
import notifyService from "../services/notify.service";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProductPage: React.FC<{ id: string }> = ({ id }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [photo, setPhoto] = useState("");
  const [description, setDescription] = useState("");
  const { checkAuthentication, checkIsAdmin, isAdmin } =
    useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    checkAuthentication();
    checkIsAdmin();
    if (id) {
      getProduct();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const getProduct = async () => {
    try {
      const productData = await ProductDataService.getProductById(id);
      setProduct(productData);
      setName(productData.name);
      setPrice(productData.price);
      setQuantity(productData.quantity ? productData.quantity : 1);
      setPhoto(productData.photo);
      setDescription(productData.description);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const handleDeleteProduct = async () => {
    try {
      await ProductDataService.deleteProduct(id);
      notifyService.showSuccessNotification(`${name} successfully deleted!`);
      redirectStore();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleUpdateProduct = async () => {
    try {
      const productDto: CreateProductDto = {
        name,
        price,
        quantity,
        photo,
        description,
      };

      await ProductDataService.updateProduct(id, productDto);
      notifyService.showSuccessNotification(`${name} successfully updated!`);
      redirectStore();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const redirectStore = () => {
    setTimeout(() => {
      navigate("/store");
    }, 1000);
  };

  const handleCreateProduct = async () => {
    try {
      const productDto: CreateProductDto = {
        name,
        price,
        quantity,
        photo,
        description,
      };

      const product: Product = await ProductDataService.createProduct(
        productDto
      );
      notifyService.showSuccessNotification(
        `${product.name} successfully created!`
      );
      redirectStore();
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <>
      {isAdmin && (
        <div className="product-container">
          {product ? (
            <div className="product-details">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-field"
                placeholder="Name"
              />
              <label htmlFor="price">Price:</label>
              <input
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(Math.max(0, Number(e.target.value)))}
                className="input-field"
                placeholder="Price"
              />
              <label htmlFor="quantity">Quantity:</label>
              <input
                type="number"
                id="quantity"
                value={quantity}
                onChange={(e) =>
                  setQuantity(Math.max(0, Number(e.target.value)))
                }
                className="input-field"
                placeholder="Quantity"
              />
              <label htmlFor="photo">Photo:</label>
              <input
                type="text"
                id="photo"
                value={photo}
                onChange={(e) => setPhoto(e.target.value)}
                className="input-field"
                placeholder="Photo"
              />
              <label htmlFor="description">Description:</label>
              <input
                type="text"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="input-field"
                placeholder="Description"
              />
              <br />
              <div>
                <button className="update-button" onClick={handleUpdateProduct}>
                  Update
                </button>
                {"   "}
                <button className="delete-button" onClick={handleDeleteProduct}>
                  Delete
                </button>
              </div>
            </div>
          ) : (
            <div>
              {id ? (
                <div>Loading...</div>
              ) : (
                <>
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input-field"
                    placeholder="Name"
                  />
                  <label htmlFor="price">Price:</label>
                  <input
                    type="number"
                    id="price"
                    value={price}
                    onChange={(e) =>
                      setPrice(Math.max(0, Number(e.target.value)))
                    }
                    className="input-field"
                    placeholder="Price"
                  />
                  <label htmlFor="quantity">Quantity:</label>
                  <input
                    type="number"
                    id="quantity"
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(Math.max(0, Number(e.target.value)))
                    }
                    className="input-field"
                    placeholder="Quantity"
                  />
                  <label htmlFor="photo">Photo:</label>
                  <input
                    type="text"
                    id="photo"
                    value={photo}
                    onChange={(e) => setPhoto(e.target.value)}
                    className="input-field"
                    placeholder="Photo"
                  />
                  <label htmlFor="description">Description:</label>
                  <input
                    type="text"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="input-field"
                    placeholder="Description"
                  />
                  <br />
                  <button
                    className="create-button"
                    onClick={handleCreateProduct}
                  >
                    Create
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ProductPage;
