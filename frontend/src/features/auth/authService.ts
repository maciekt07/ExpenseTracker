import axios from "axios";
import { UserData } from "../../types/types";

const API_URL = "api/users/";

const register = async (userData: UserData) => {
  try {
    console.log("Making request to register user:", userData);
    const response = await axios.post(API_URL, userData);
    console.log("Received response:", response);

    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

const login = async (userData: UserData) => {
  try {
    console.log("Making request to login user:", userData);
    const response = await axios.post(API_URL + "login", userData);
    console.log("Received response:", response);

    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};

const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  logout,
  login,
};
export default authService;
