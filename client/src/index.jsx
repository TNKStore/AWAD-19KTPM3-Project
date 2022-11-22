import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Box,
  CssBaseline,
  StyledEngineProvider,
  Toolbar,
  Typography
} from "@mui/material";
import ErrorPage from "./error-page";
import ImagePage from "./pages/images";
import reportWebVitals from "./reportWebVitals";
import FormWithoutHookForm from "./pages/login";
import SideMenu from "./components/menu";
import TopBar from "./components/appBar";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <StyledEngineProvider injectFirst>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <SideMenu />
          <TopBar />
          <Box
            component="main"
            sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
          >
            <Toolbar />
            <Typography paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod
            </Typography>
            <Typography paragraph>
              Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
              ullamcorper
            </Typography>
          </Box>
        </Box>
      </StyledEngineProvider>
    ),
    errorElement: <ErrorPage />
  },
  {
    path: "login/",
    element: <FormWithoutHookForm />
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
