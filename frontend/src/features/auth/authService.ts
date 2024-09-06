import axios from "axios";
import { UserData } from "@shared/types/types";

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

// Update user information
const updateUser = async (userData: Partial<UserData>) => {
  try {
    // Get the token from local storage
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (!user.token) {
      throw new Error("No token found");
    }

    // Make the API call to update user
    const response = await axios.put(API_URL + "update", userData, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

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

// Upload profile picture
const uploadProfilePicture = async (formData: FormData) => {
  try {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (!user.token) {
      throw new Error("No token found");
    }

    const response = await axios.post(API_URL + "upload-profile-picture", formData, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    // Update local storage with the new user data
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
  } catch (error) {
    console.error("Error uploading profile picture:", error);
    throw error;
  }
};

const logout = () => {
  localStorage.removeItem("user");
};
const removeProfilePicture = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    console.log("User from localStorage:", user);

    if (!user.token) {
      throw new Error("No token found");
    }

    const response = await axios.post(
      API_URL + "remove-profile-picture",
      {},
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      },
    );

    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
  } catch (error) {
    console.error("Error removing profile picture:", error);
    throw error;
  }
};

const authService = {
  register,
  logout,
  login,
  updateUser,
  uploadProfilePicture,
  removeProfilePicture,
};
export default authService;
