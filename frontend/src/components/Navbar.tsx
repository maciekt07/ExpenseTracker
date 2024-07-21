import { Link } from "react-router-dom";

function Navbar() {
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
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </div>
  );
}

export default Navbar;
