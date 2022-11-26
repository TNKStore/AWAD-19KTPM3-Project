import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./error-page";
import ImagePage from "./pages/images";
import reportWebVitals from "./reportWebVitals";
import Root from "./pages/root";
import "./index.css";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import ActivatePage from "./pages/activate";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />
  },
  {
    path: "login/",
    element: <LoginPage />
  },
  {
    path: "register/",
    element: <RegisterPage />
  },
  {
    path: "activate/",
    element: <ActivatePage />
  },
  {
    path: "images/",
    element: <ImagePage />
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </QueryClientProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
