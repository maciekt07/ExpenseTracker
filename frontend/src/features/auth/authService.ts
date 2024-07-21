import axios from "axios";

interface User {
  name: string;
  email: string;
  password: string;
}

const API_URL = "http://localhost:8000/api/users/";

const register = async (userData: User) => {
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

const authService = {
  register,
};
export default authService;
