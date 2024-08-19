import { Provider } from "react-redux";
import { store } from "@/store/store";
import { Router } from "@/router/router";

export function App() {
  return (
    <Provider store={store}>
      {/*<BrowserRouter>*/}
      {/*<Layout />*/}
      {/*<Pages />*/}
      <Router />
      {/*</BrowserRouter>*/}
    </Provider>
  );
}
