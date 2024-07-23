import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import NotFound from "./pages/404";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MainLayout from "./layouts/MainLayout";
import { Provider } from "react-redux";
import { store } from "./app/strore";
import Add from "./pages/Add";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Provider store={store}>
      <MainLayout>
        <Toaster position="bottom-center" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add" element={<Add />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MainLayout>
    </Provider>
  );
}

export default App;
