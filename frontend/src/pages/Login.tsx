import { useState } from "react";

interface FormData {
  email: string;
  password: string;
}

function Login() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div>
      <h2>Create Account</h2>
      <form
        onSubmit={onSubmit}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <input
          required
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          value={email}
          onChange={onChange}
        />
        <input
          required
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          value={password}
          onChange={onChange}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Login;
