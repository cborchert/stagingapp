// import React from "react";
// import ReactDOM from "react-dom";
import { h, render } from "preact";
import Terminal from "./components/Terminal";
import "./index.css";
/** @jsx h */

if (process.env.NODE_ENV === "development") {
  // Enable preact devtools
  // eslint-disable-next-line import/no-unassigned-import
  require("preact/devtools");
}

const App = () => (
  <div className="App">
    <Terminal>welcome to stagingsite.app</Terminal>
  </div>
);

const mountNode = document.getElementById("root");

render(<App />, mountNode, mountNode.lastChild);

// Hot Module Replacement
if (module.hot) {
  module.hot.accept();
}
