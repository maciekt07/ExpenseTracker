import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/404";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MainLayout from "./layouts/MainLayout";
import { useSelector } from "react-redux";
import { RootState } from "./app/store";
import Add from "./pages/Add";
import { Toaster } from "react-hot-toast";
import UserProfile from "./pages/UserProfile";
import { useEffect } from "react";

function App() {
  const theme = useSelector(
    (state: RootState) => state.settings.settings.theme
  );

  useEffect(() => {
    const htmlElement = document.documentElement;

    if (theme === "system") {
      htmlElement.removeAttribute("data-theme");
    } else if (theme === "light") {
      htmlElement.setAttribute("data-theme", "lightTheme");
    } else if (theme === "dark") {
      htmlElement.setAttribute("data-theme", "darkTheme");
    }
  }, [theme]);
  return (
    <MainLayout>
      <Toaster position="bottom-center" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add" element={<Add />} />
        <Route path="/user" element={<UserProfile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
