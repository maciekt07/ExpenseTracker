import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";
import { IconContext } from "react-icons";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <IconContext.Provider value={{ size: "1.4em" }}>
      <BrowserRouter>
        <App />
      </BrowserRouter>{" "}
    </IconContext.Provider>
  </Provider>,
);
