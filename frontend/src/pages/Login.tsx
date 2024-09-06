import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../app/store";
import { login, reset } from "../features/auth/authSlice";

import toast from "react-hot-toast";
import Loading from "../components/Loading";
import { UserData } from "@shared/types/types";

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

  const n = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state: RootState) => state.auth,
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      n("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, n, dispatch]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };
    //FIXME: Type error
    dispatch(login(userData as UserData));
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <section className="w-full max-w-sm bg-base-200 p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <p className="mb-6">Please login to your account</p>
        <form onSubmit={onSubmit} className="space-y-4">
          <input
            required
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={onChange}
            className="input input-bordered w-full max-w-xs"
          />
          <input
            required
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={onChange}
            className="input input-bordered w-full max-w-xs"
          />
          <button type="submit" className="btn w-full btn-primary">
            Login
          </button>
        </form>
        <p className="text-center text-sm mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="link text-blue-500">
            Register here
          </Link>
        </p>
      </section>
    </div>
  );
}

export default Login;
