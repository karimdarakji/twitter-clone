import { createRoot } from "react-dom/client";

import { Helmet } from "react-helmet";
import { Provider } from "react-redux";

import App from "./App";
import "./App.scss";
import { AuthProvider } from "./Context/AuthProvider";
import { store } from "./redux/store";

const container = document.getElementById("app");

const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(
  <Provider store={store}>
    <AuthProvider>
      <Helmet>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Helmet>
      <App />
    </AuthProvider>
  </Provider>
);
