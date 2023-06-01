import {
  UpdateProductDto,
  CreateProductDto,
  Product,
} from "../../context/interfaces/product.type";
import notifyService from "../notify.service";
import getAuthorizationHeader from "../util/getAuthorizationHeader";
import http from "./http-common";

class ProductDataService {
  async getAllProducts() {
    try {
      const response = await http.get("/product/list", {
        headers: getAuthorizationHeader(),
      });
      return response.data as Product[];
    } catch (error) {
      console.error("Get all products error:", error);
      notifyService.showErrorNotification(
        "Error occurred while retrieving products."
      );
      throw error;
    }
  }

  async getProductById(id: string) {
    try {
      const response = await http.get(`/product/${id}`, {
        headers: getAuthorizationHeader(),
      });
      const result = {
        ...response.data,
        quantity: response.data.stock.quantity,
      };
      return result as Product;
    } catch (error) {
      console.error("Get product by ID error:", error);
      notifyService.showErrorNotification(
        "Error occurred while retrieving product details."
      );
      throw error;
    }
  }

  async createProduct(productDto: CreateProductDto) {
    try {
      const response = await http.post(
        "/product",
        { product: { ...productDto } },
        { headers: getAuthorizationHeader() }
      );
      return response.data as Product;
    } catch (error) {
      console.error("Create product error:", error);
      notifyService.showErrorNotification(
        "Error occurred while creating the product."
      );
      throw error;
    }
  }

  async updateProduct(id: string, productDto: UpdateProductDto) {
    try {
      const response = await http.patch(
        `/product/${id}`,
        { product: { ...productDto } },
        { headers: getAuthorizationHeader() }
      );
      return response.data;
    } catch (error) {
      console.error("Update product error:", error);
      notifyService.showErrorNotification(
        "Error occurred while updating the product."
      );
      throw error;
    }
  }

  async deleteProduct(id: string) {
    try {
      const response = await http.delete(`/product/${id}`, {
        headers: getAuthorizationHeader(),
      });
      return response.data as Product;
    } catch (error) {
      console.error("Delete product error:", error);
      notifyService.showErrorNotification(
        "Error occurred while deleting the product."
      );
      throw error;
    }
  }
}

export default new ProductDataService();
