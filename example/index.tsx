// import "reflect-metadata";

import { render } from "solid-js/web";

import App from "./app.jsx";

const root = document.getElementById("root");
if (root) {
  render(() => <App />, root);
}
