import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage.jsx";
import { RootLayout } from "./pages/RootLayout.jsx";
import { WelcomePage } from "./pages/WelcomePage.jsx";
import { ThemeProvider, createTheme } from "@mui/material/styles";
const defaultTheme = createTheme();
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [{ index: true, element: <LoginPage /> }],
  },
  { path: "/welcome", element: <WelcomePage /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={defaultTheme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
