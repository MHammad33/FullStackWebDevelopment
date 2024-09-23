import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import { NotificationContextProvider } from "./reducers/NotificationContext";
import { UserContextProvider } from "./reducers/UserContext";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <UserContextProvider>
      <NotificationContextProvider>
        <Router>
          <App />
        </Router>
      </NotificationContextProvider>
    </UserContextProvider>
  </QueryClientProvider>
);
