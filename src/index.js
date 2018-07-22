import React from "react";
import ReactDOM from "react-dom";
import Terminal from "./components/Terminal";
import "./index.css";

const App = () => (
  <div className="App">
    <Terminal />
  </div>
);

ReactDOM.render(<App />, document.getElementById("root"));

// Hot Module Replacement
if (module.hot) {
  module.hot.accept();
}
