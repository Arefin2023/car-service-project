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
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  SignIn,
  SignUp,
} from "@clerk/clerk-react";

if (!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const defaultTheme = createTheme();
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <LoginPage /> },
      {
        path: "/sign-in/*",
        element: <SignIn routing="path" path="/sign-in" />,
      },
      {
        path: "/sign-up/*",
        element: <SignUp routing="path" path="/sign-up" />,
      },
      {
        path: "/welcome",
        element: (
          <>
            <SignedIn>
              <WelcomePage />
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
        ),
      },
      {
        path: "/appointment",
        element: (
          <>
            <SignedIn>
              <AppointmentPage />
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
        ),
      },
      {
        path: "/wip",
        element: (
          <>
            <SignedIn>
              <WipPage />
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
        ),
      },
      {
        path: "/message",
        element: (
          <>
            <SignedIn>
              <MessagePage />
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
        ),
      },
      {
        path: "/history",
        element: (
          <>
            <SignedIn>
              <ServiceHistoryPage />
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={defaultTheme}>
      <ClerkProvider
        publishableKey={clerkPubKey}
        signInUrl="http://localhost:5173/sign-in"
      >
        <RouterProvider router={router} />
      </ClerkProvider>
    </ThemeProvider>
  </React.StrictMode>
);
