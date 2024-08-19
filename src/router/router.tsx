import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import { PrivateRoute } from "@/router/private-route";
import { PATH } from "@/router/path";
import { Advert, CreateUser, Login, Main, Users } from "@/pages";
import { Layout, SidebarLayout } from "@/components/layout";
import { Home } from "@/pages/home";

const publicRoutes: RouteObject[] = [
  {
    path: PATH.LOGIN,
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Login />,
      },
    ],
  },
  {
    path: PATH.CREATE,
    element: <Layout />,
    children: [
      {
        path: "",
        element: <CreateUser />,
      },
    ],
  },
  {
    path: PATH.MAIN,
    element: <SidebarLayout />,
    children: [
      {
        path: "",
        element: <Main />,
      },
    ],
  },
];

const privateRoutes: RouteObject[] = [
  {
    path: PATH.HOME,
    element: <Home />,
  },
  {
    path: PATH.USERS,
    element: <Users />,
  },
  {
    path: PATH.ADVERT,
    element: <Advert />,
  },
];

const router = createBrowserRouter([
  {
    element: <PrivateRoute />,
    children: [
      {
        element: <SidebarLayout />,
        children: privateRoutes,
      },
    ],
  },
  ...publicRoutes,
]);

export function Router() {
  return <RouterProvider router={router} />;
}
