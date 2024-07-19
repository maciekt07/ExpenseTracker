// src/services/authService.ts
import axios from "axios";
import { AuthResponse, UserData } from "../types/user";

const API_URL = "http://localhost:8000/api/users"; // Adjust the base URL as necessary

const register = async (userData: UserData): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(`${API_URL}/`, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const login = async (
  userData: Omit<UserData, "username">
): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(`${API_URL}/`, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const authService = {
  register,
  login,
};

export default authService;
