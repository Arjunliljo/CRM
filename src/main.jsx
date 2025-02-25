import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import { Provider } from "react-redux";
import store from "../global/store.js";
import { QueryClientProvider } from "@tanstack/react-query";
import { ApiProvider } from "./context/apiContext/ApiContext.jsx";
import queryClient from "../config/reactQuery.js";
import SocketProvider from "../config/socketProvider.jsx";
import { router } from "../router/router.jsx";
import CustomRouterProvider from "../router/CustomRouterProvider.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <ApiProvider>
        <SocketProvider>
          <CustomRouterProvider />
        </SocketProvider>
      </ApiProvider>
    </QueryClientProvider>
  </Provider>
);
