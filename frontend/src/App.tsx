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
import { useSystemTheme } from "./hooks/useSystemTheme";

function App() {
  const theme = useSelector((state: RootState) => state.settings.settings.theme);

  const systemTheme = useSystemTheme();

  useEffect(() => {
    const htmlElement = document.documentElement;
    const metaThemeColor = document.querySelector("meta[name=theme-color]") as HTMLMetaElement;
    if (theme === "system") {
      htmlElement.removeAttribute("data-theme");
      metaThemeColor.setAttribute("content", systemTheme === "dark" ? "#1d232a" : "#ffffff");
    } else if (theme === "light") {
      htmlElement.setAttribute("data-theme", "lightTheme");
      metaThemeColor.setAttribute("content", "#ffffff");
    } else if (theme === "dark") {
      htmlElement.setAttribute("data-theme", "darkTheme");
      metaThemeColor.setAttribute("content", "#1d232a");
    }
  }, [theme, systemTheme]);

  return (
    <MainLayout>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={12}
        containerStyle={{
          marginBottom: "12px",
        }}
        toastOptions={{
          position: "bottom-center",
          duration: 4000,
          style: {
            padding: "14px 22px",
            borderRadius: "18px",
            fontSize: "17px",
            border: `2px solid #0061FF`,
            background: "#141431e0",
            color: "white",
            WebkitBackdropFilter: "blur(14px)",
            backdropFilter: "blur(14px)",
          },
          success: {
            iconTheme: {
              primary: "#0061FF",
              secondary: "#ffffff",
            },
          },
          error: {
            iconTheme: {
              primary: "#ff0000",
              secondary: "white",
            },
            style: {
              borderColor: "#ff0000",
            },
          },
        }}
      />
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
