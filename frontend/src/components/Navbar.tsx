import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../app/store";

function Navbar() {
  const n = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    n("/");
  };

  return (
    <div className="absolute top-0 left-0 w-full h-16 bg-slate-500 text-white flex items-center gap-7 px-4 py-2">
      <Link to="/">Home</Link>
      {user ? (
        <button className="text-red-400" onClick={handleLogout}>
          Logout
        </button>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </div>
  );
}

export default Navbar;
