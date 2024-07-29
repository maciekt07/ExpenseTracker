export interface UserData {
  name: string;
  email: string;
  password: string;
  profilePicture?: string;
  token?: string;
}

export interface AuthResponse {
  _id: string;
  name: string;
  email: string;
  token: string;
}

export type Expense = {
  _id: string;
  text: string;
  amount: number;
  type: "income" | "expense";
  createdAt: string;
};
export interface Settings {
  theme: "system" | "light" | "dark";
  currency: "USD" | "EUR";
}
