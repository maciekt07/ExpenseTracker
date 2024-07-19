import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Add from "./pages/Add";
import NotFound from "./pages/404";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add" element={<Add />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/register"
        element={
          <AuthProvider>
            <Register />
          </AuthProvider>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
