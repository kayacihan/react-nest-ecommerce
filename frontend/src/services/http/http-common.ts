import axios from "axios";
import notifyService from "../notify.service";

const baseURL = "http://localhost:8000/"; // process.env.API_BASE_URL || "http://localhost:8000/";

const api = axios.create({
  baseURL,
  headers: {
    "Content-type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    if (response) {
      const { data } = response;
      const errorMessage = data?.message || "An error occurred.";
      notifyService.showErrorNotification(errorMessage);
    } else {
      notifyService.showErrorNotification("Unable to connect to the server.");
    }
    return Promise.reject(error);
  }
);

export default api;
