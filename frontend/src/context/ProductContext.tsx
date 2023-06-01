import React, { createContext, ReactNode, useContext, useState } from "react";
import ProductDataService from "../services/http/products.service";

import {
  CreateProductDto,
  Product,
  UpdateProductDto,
} from "./interfaces/product.type";

type ProductContext = {
  products: Product[];
  product: Product | null;
  getAllProducts: () => Promise<void>;
  getProductById: (id: string) => Promise<void>;
  createProduct: (productDto: CreateProductDto) => void;
  updateProduct: (id: string, productDto: UpdateProductDto) => Promise<Product>;
  deleteProduct: (id: string) => Promise<Product>;
};

const ProductContext = createContext({} as ProductContext);

type ProductProviderProps = {
  children: ReactNode;
};

const ProductProvider = ({ children }: ProductProviderProps) => {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [product, setProduct] = useState<Product | null>(null);

  const getAllProducts = async () => {
    try {
      const response = await ProductDataService.getAllProducts();
      setProducts(response);
    } catch (error) {
      console.error("Get all products error:", error);
      throw error;
    }
  };

  const getProductById = async (id: string): Promise<void> => {
    try {
      const response = await ProductDataService.getProductById(id);
      setProduct(response as Product);
    } catch (error) {
      console.error("Get product by ID error:", error);
      throw error;
    }
  };

  const createProduct = async (productDto: CreateProductDto): Promise<void> => {
    try {
      const response = await ProductDataService.createProduct(productDto);
      setProduct(response as Product);
    } catch (error) {
      console.error("Create product error:", error);
      throw error;
    }
  };

  const updateProduct = async (id: string, productDto: UpdateProductDto) => {
    try {
      const response = await ProductDataService.updateProduct(id, productDto);
      return response;
    } catch (error) {
      console.error("Update product error:", error);
      throw error;
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      const response = await ProductDataService.deleteProduct(id);
      return response;
    } catch (error) {
      console.error("Delete product error:", error);
      throw error;
    }
  };

  return (
    <ProductContext.Provider
      value={{
        product,
        products: products ?? [],
        getAllProducts,
        getProductById,
        createProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

const useProductContext = () => {
  return useContext(ProductContext);
};

export { ProductContext, ProductProvider, useProductContext };
