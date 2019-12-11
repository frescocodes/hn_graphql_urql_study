import React from "react";
import { render } from "react-dom";
import "./styles/index.css";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";

import { Provider, Client, defaultExchanges } from "urql";

// gets passed in to Provider as props "value"
const client = new Client({
  url: "http://localhost:4000",
  exchanges: defaultExchanges
});

render(
  <Provider value={client}>
    <App />
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
