import { Route, Routes } from "react-router-dom";

import { PrivateRoute } from "@/router/private-route";
import { PATH } from "@/router/path";
import { Advert, Login, Main, Users } from "@/pages";

export const Pages = () => {
  return (
    <Routes>
      <Route path={PATH.LOGIN} element={<Login />} />

      <Route element={<PrivateRoute />}>
        <Route index path={"/"} element={<Main />} />
        <Route path={PATH.USERS} element={<Users />} />
        <Route path={PATH.ADVERT} element={<Advert />} />
      </Route>
    </Routes>
  );
};
