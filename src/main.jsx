import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "../router/router.jsx";
import { Provider } from "react-redux";
import store from "../global/store.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </Provider>
);
