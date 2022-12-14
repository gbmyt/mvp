import React from "react";
import ReactDOM from "react-dom/client";
import App from "./src/App";
import JSXApp from "./client/babel-src/App.jsx";

var rootEl = document.getElementById("root");
var root = ReactDOM.createRoot(rootEl);

root.render(<JSXApp />);
