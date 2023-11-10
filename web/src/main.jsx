import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage.jsx";
import { RootLayout } from "./pages/RootLayout.jsx";
import { WelcomePage } from "./pages/WelcomePage.jsx";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { AppointmentPage } from "./pages/AppointmentPage.jsx";
import { WipPage } from "./pages/WipPage.jsx";
import { MessagePage } from "./pages/MessagePage.jsx";
import { ServiceHistoryPage } from "./pages/ServiceHistoryPage.jsx";
const defaultTheme = createTheme();
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [{ index: true, element: <LoginPage /> }],
  },
  { path: "/welcome", element: <WelcomePage /> },
  { path: "/appointment", element: <AppointmentPage /> },
  { path: "/wip", element: <WipPage /> },
  { path: "/message", element: <MessagePage /> },
  { path: "/history", element: <ServiceHistoryPage /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={defaultTheme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
