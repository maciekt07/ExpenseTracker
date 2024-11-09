import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import { AppDispatch, RootState } from "../app/store";
import logo from "../assets/logo512.png";
import { FaBars, FaTimes } from "react-icons/fa";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import ThemeSwitcher from "./ThemeSwitch";

function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="relative">
      {/* Backdrop */}
      {isSidebarOpen && <div className="fixed inset-0 bg-black/40 z-20" onClick={closeSidebar} />}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 w-64 h-full bg-base-200 shadow-lg transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        } lg:hidden z-30`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-end p-4 border-b border-base-300">
            <button className="text-2xl" onClick={closeSidebar}>
              <FaTimes />
            </button>
          </div>

          <div className="flex-grow px-2 py-2">
            <ThemeSwitcher />
            {user ? (
              <>
                <Link
                  to="/"
                  className="block p-2 text-lg hover:bg-base-300 rounded"
                  onClick={closeSidebar}
                >
                  Home
                </Link>
                <button
                  className="btn btn-error w-full flex items-center space-x-2"
                  onClick={() => {
                    handleLogout();
                    closeSidebar();
                  }}
                >
                  <FaArrowRightFromBracket /> Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block p-2 text-lg hover:bg-base-300 rounded"
                  onClick={closeSidebar}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block p-2 text-lg hover:bg-base-300 rounded"
                  onClick={closeSidebar}
                >
                  Register
                </Link>
              </>
            )}
          </div>
          {user && (
            <div className="py-4 px-2 border-t border-base-300">
              <Link to="/user" className="flex items-center space-x-2" onClick={closeSidebar}>
                {user.profilePicture ? (
                  <img
                    className="w-8 h-8 rounded-full"
                    src={`/${user.profilePicture}?${user.token}`}
                    alt="Profile"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-base-300 flex items-center justify-center">
                    {user.name ? user.name[0] : ""}
                  </div>
                )}
                <span className="text-lg">{user.name}</span>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Navbar */}
      <nav className="bg-base-200 fixed top-0 left-0 w-full z-10 shadow-md">
        <div className="container mx-auto flex items-center justify-between p-4">
          <Link to="/" className="flex items-center space-x-4">
            <img src={logo} alt="logo" className="h-10 w-10" />
            <span className="text-xl font-semibold">Expense Tracker</span>
          </Link>
          <div className="hidden lg:flex items-center space-x-6">
            {user ? (
              <>
                <Link to="/" className="btn btn-ghost hover:bg-base-300">
                  Home
                </Link>
                <button className="btn btn-error btn-outline" onClick={handleLogout}>
                  <FaArrowRightFromBracket /> Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-ghost hover:bg-base-300">
                  Login
                </Link>
                <Link to="/register" className="btn btn-ghost hover:bg-base-300">
                  Register
                </Link>
              </>
            )}
            <ThemeSwitcher />
            {user && (
              <Link to="/user" className="flex items-center space-x-2">
                {user.profilePicture ? (
                  <img
                    className="w-8 h-8 rounded-full"
                    src={`/${user.profilePicture}?${user.token}`}
                    alt="Profile"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-base-300 flex items-center justify-center">
                    {user.name ? user.name[0] : ""}
                  </div>
                )}
                <span>{user.name}</span>
              </Link>
            )}
          </div>
          <button className="lg:hidden text-2xl" onClick={() => setIsSidebarOpen(true)}>
            <FaBars />
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
