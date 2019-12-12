import React from "react";
import { render } from "react-dom";
import "./styles/index.css";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";

import { Provider, Client, dedupExchange, fetchExchange } from "urql";
// defaultExchanges array includes: dedupExchange, cacheExchange, fetchExchange
import { cacheExchange } from "@urql/exchange-graphcache";
// dedup: if you send same queries at the same time, dedup will make sure only one is sent to API
// cache: caches operation results (doc cache). caches results from graphQL API by the unique query + variables combination that those results have been requested with
// fetch: sends graphQL requests using fetch and supports cancellation by default

// create new normalized cache
const cache = cacheExchange({});

// urql needs to tknow the endpoint of the graphQL API to deal with network connections
const client = new Client({
  url: "http://localhost:4000",
  exchanges: [dedupExchange, cache, fetchExchange]
});

// wrap app with context Provider for urql client
render(
  <BrowserRouter>
    <Provider value={client}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);

serviceWorker.unregister();
