import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register, reset } from "../features/auth/authSlice";
import { AppDispatch, RootState } from "../app/store";
import toast from "react-hot-toast";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const n = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (isSuccess || user) {
      n("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, n, dispatch]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Form submitted with data:", formData);

    if (password !== password2) {
      toast.error("Passwords do not match");
    } else {
      const userData = {
        name,
        email,
        password,
      };

      console.log("Dispatching register action with userData:", userData);
      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-white">
      <section className="w-full max-w-sm bg-gray-800 p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Register</h1>
        <p className="mb-6">Please create an account</p>
        <form onSubmit={onSubmit} className="space-y-4">
          <input
            type="text"
            className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-md"
            id="name"
            name="name"
            value={name}
            placeholder="Enter your name"
            onChange={onChange}
          />
          <input
            type="email"
            className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-md"
            id="email"
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={onChange}
          />
          <input
            type="password"
            className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-md"
            id="password"
            name="password"
            value={password}
            placeholder="Enter your password"
            onChange={onChange}
          />
          <input
            type="password"
            className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-md"
            id="password2"
            name="password2"
            value={password2}
            placeholder="Confirm your password"
            onChange={onChange}
          />
          <button
            type="submit"
            className="w-full font-semibold bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Register
          </button>
        </form>
      </section>
    </div>
  );
}

export default Register;
