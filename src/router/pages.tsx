import { Route, Routes } from "react-router-dom";

import { Advert, Login, Main, Users } from "@/pages";
import { PATH } from "@/router/path";
import { PrivateRoute } from "@/router/private-route";

export const Pages = () => {
  return (
    <Routes>
      <Route element={<Login />} path={PATH.LOGIN} />

      <Route element={<PrivateRoute />}>
        <Route element={<Main />} index path={"/"} />
        <Route element={<Users />} path={PATH.USERS} />
        <Route element={<Advert />} path={PATH.ADVERT} />
      </Route>
    </Routes>
  );
};
