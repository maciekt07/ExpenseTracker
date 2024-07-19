// src/components/Register.tsx
import { useState, useContext, ChangeEvent, FormEvent } from "react";
import AuthContext from "../contexts/AuthContext";

interface FormData {
  username: string;
  email: string;
  password: string;
}

const Register = () => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
  });

  const { username, email, password } = formData;
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("AuthContext is not provided");
  }

  const { register } = authContext;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await register({ username, email, password });
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={onChange}
          required
        />
      </div>
      <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={onChange}
          required
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={onChange}
          required
        />
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
