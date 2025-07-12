import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { ROUTES } from "@/shared/routes/routes";

export const router = createBrowserRouter([
  {
    path: ROUTES.MAIN,
    element: <App />,
    children: [
      {
        path: ROUTES.GAMES,
        lazy: async () => {
          const module = await import("@/pages/GamesPage");
          return { element: <module.default /> };
        },
      },
    ],
  },
]);
