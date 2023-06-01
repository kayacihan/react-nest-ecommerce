import {
  LoginUserDto,
  RegisterUserDto,
} from "../../context/interfaces/auth.type";
import getAuthorizationHeader from "../util/getAuthorizationHeader";
import http from "./http-common";

class AuthDataService {
  async login(loginDto: LoginUserDto) {
    try {
      const response = await http.post("/user/login", {
        user: { ...loginDto },
      });
      return response.data;
    } catch (error) {
      console.error("Login error:", error);
      throw new Error("An error occurred during login.");
    }
  }

  async register(registerDto: RegisterUserDto) {
    try {
      const response = await http.post("/user", {
        user: { ...registerDto },
      });
      return response.data;
    } catch (error) {
      console.error("Register error:", error);
      throw new Error("An error occurred during registration.");
    }
  }

  async currentUser() {
    try {
      const response = await http.get("/user", {
        headers: getAuthorizationHeader(),
      });
      return response.data;
    } catch (error) {
      console.error("Token:", error);
      throw new Error("An error occurred during login.");
    }
  }
}

export default new AuthDataService();
