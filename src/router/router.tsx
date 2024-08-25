import {
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import { Layout, SidebarLayout } from "@/components/layout";
import { Advert, CreateUser, Login, Main, Users } from "@/pages";
import { Home } from "@/pages/home";
import { Profile } from "@/pages/profile";
import { PATH } from "@/router/path";
import { PrivateRoute } from "@/router/private-route";

const publicRoutes: RouteObject[] = [
  {
    children: [
      {
        element: <Login />,
        path: "",
      },
    ],
    element: <Layout />,
    path: PATH.LOGIN,
  },
  {
    children: [
      {
        element: <CreateUser />,
        path: "",
      },
    ],
    element: <Layout />,
    path: PATH.CREATE,
  },
  {
    children: [
      {
        element: <Main />,
        path: "",
      },
    ],
    element: <SidebarLayout />,
    path: PATH.MAIN,
  },
];

const privateRoutes: RouteObject[] = [
  {
    element: <Home />,
    path: PATH.HOME,
  },
  {
    element: <Profile />,
    path: PATH.PROFILE,
  },
  {
    element: <Users />,
    path: PATH.USERS,
  },
  {
    element: <Advert />,
    path: PATH.ADVERT,
  },
];

const router = createBrowserRouter([
  {
    children: [
      {
        children: privateRoutes,
        element: <SidebarLayout />,
      },
    ],
    element: <PrivateRoute />,
  },
  ...publicRoutes,
]);

export function Router() {
  return <RouterProvider router={router} />;
}
