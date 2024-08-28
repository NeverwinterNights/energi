import { Provider } from "react-redux";

import { Router } from "@/router/router";
import { store } from "@/store/store";

export function App() {
  return (
    <Provider store={store}>
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          backgroundColor: "var(--dark-700)",
        }}
      >
        {/*<BrowserRouter>*/}
        {/*<Layout />*/}
        {/*<Pages />*/}
        <Router />
      </div>
      {/*</BrowserRouter>*/}
    </Provider>
  );
}
