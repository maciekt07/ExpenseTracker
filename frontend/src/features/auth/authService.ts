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

const login = async (userData: Pick<UserData, "email" | "password">) => {
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

// Reusable config function
const createConfig = (token: string) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// Update user information
const updateUser = async (userData: Partial<UserData>) => {
  try {
    // Get the token from local storage
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (!user.token) {
      throw new Error("No token found");
    }

    // Create configuration with the token
    const config = createConfig(user.token);

    // Make the API call to update user
    const response = await axios.put(API_URL + "update", userData, config);

    // Update local storage with the new user data
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
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
  updateUser,
};
export default authService;
