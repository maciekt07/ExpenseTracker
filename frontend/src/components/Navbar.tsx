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
    <nav className="fixed top-0 left-0 w-full h-18 bg-base-200 flex items-center justify-between px-4 py-4 shadow-md backdrop-blur-md bg-opacity-80">
      <Link to="/">
        <div className="flex items-center gap-4">
          <img src={logo} alt="logo" className="h-10 w-10 object-cover" />
          <span className="text-lg font-semibold" translate="no">
            Expense Tracker
          </span>
        </div>
      </Link>

      <div className="flex items-center gap-6">
        {user ? (
          <>
            <Link to="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <button
              className="text-error transition-colors"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-primary transition-colors">
              Login
            </Link>
            <Link
              to="/register"
              className="hover:text-primary transition-colors"
            >
              Register
            </Link>
          </>
        )}
        {user && (
          <Link to="/user">
            <div className="flex items-center gap-2 bg-base-200 py-2 px-3 rounded-lg cursor-pointer transition-colors">
              <div className="size-8 rounded-full bg-base-300 flex items-center justify-center">
                {user?.name[0]}
              </div>
              {user?.name}
            </div>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
