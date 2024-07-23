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
    <div
      style={{
        position: "absolute",
        display: "flex",
        top: "0",
        left: "0",
        width: "100%",
        height: "3rem",
        backgroundColor: "#242424",
        color: "#fff",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <Link to="/">Home</Link>
      {user && <div>Welcome {user.name}</div>}
      {user ? (
        <button onClick={handleLogout} style={{ color: "red" }}>
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
