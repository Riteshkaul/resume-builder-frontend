import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from "./auth/sign-in/Index.jsx";
import Home from "./home/Home.jsx";
import Dashboard from "./dashboard/Dashboard.jsx";
import { ClerkProvider } from "@clerk/clerk-react";
import EditResume from "./dashboard/resume/[resume]/index.jsx";
import ViewResume from "./my-resume/[resumeId]/view/Index.jsx";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    element: <App />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/dashboard/resume/:resumeId/edit",
        element: <EditResume />,
      },
    ],
  },

  {
    path: "/auth/sign-in",
    element: <Index />,
  },
  {
    path: "/my-resume/:resumeId/view",
    element: <ViewResume />,
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <RouterProvider router={router} />
    </ClerkProvider>
  </StrictMode>
);
