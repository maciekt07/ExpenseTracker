export interface UserData {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  _id: string;
  username: string;
  email: string;
  token: string;
}
