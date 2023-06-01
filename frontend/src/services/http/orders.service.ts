import { OrderDto } from "../../context/interfaces/order.type";
import notifyService from "../notify.service";
import getAuthorizationHeader from "../util/getAuthorizationHeader";
import http from "./http-common";

class OrderDataService {
  async getAllOrders() {
    try {
      const response = await http.get("/order/list", {
        headers: getAuthorizationHeader(),
      });
      return response.data;
    } catch (error) {
      console.error("Get all orders error:", error);
      notifyService.showErrorNotification(
        "Error occurred while retrieving orders."
      );
      throw error;
    }
  }

  async getOrderById(id: string) {
    try {
      const response = await http.get(`/order/${id}`);
      return response.data;
    } catch (error) {
      console.error("Get order by ID error:", error);
      notifyService.showErrorNotification(
        "Error occurred while retrieving order details."
      );
      throw error;
    }
  }

  async createOrder(orderDto: OrderDto) {
    try {
      const response = await http.post(
        "/order",
        { order: { ...orderDto } },
        { headers: getAuthorizationHeader() }
      );
      return response.data;
    } catch (error) {
      console.error("Create order error:", error);
      notifyService.showErrorNotification(
        "Error occurred while creating the order."
      );
      throw error;
    }
  }

  async updateOrder(id: string, orderDto: OrderDto) {
    try {
      const response = await http.patch(
        `/order/${id}`,
        { order: { ...orderDto } },
        { headers: getAuthorizationHeader() }
      );
      return response.data;
    } catch (error) {
      console.error("Update order error:", error);
      notifyService.showErrorNotification(
        "Error occurred while updating the order."
      );
      throw error;
    }
  }

  async deleteOrder(id: string) {
    try {
      const response = await http.delete(`/order/${id}`);
      return response.data;
    } catch (error) {
      console.error("Delete order error:", error);
      notifyService.showErrorNotification(
        "Error occurred while deleting the order."
      );
      throw error;
    }
  }
}

export default new OrderDataService();
