import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../app/store";
import logo from "../assets/logo512.png";

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
    <nav className="fixed top-0 left-0 w-full h-16 bg-slate-800 text-white flex items-center justify-between px-4 py-4 shadow-md backdrop-blur-md bg-opacity-80">
      <div className="flex items-center gap-4">
        <img src={logo} alt="logo" className="h-10 w-10 object-cover" />
        <span className="text-xl md:text-2xl font-bold">Expense Tracker</span>
      </div>

      <div className="flex items-center gap-6">
        <Link to="/" className="hover:text-sky-400 transition-colors">
          Home
        </Link>
        {user ? (
          <button
            className="text-red-400 hover:text-red-300 transition-colors"
            onClick={handleLogout}
          >
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="hover:text-sky-400 transition-colors">
              Login
            </Link>
            <Link
              to="/register"
              className="hover:text-sky-400 transition-colors"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
