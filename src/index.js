import React from "react";
import ReactDOM from "react-dom";
import "semantic-ui-css/semantic.css";
import App from "app/layout/App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import configureStore from "app/store/configureStore";

const store = configureStore();
const rootEl = document.getElementById("root");

const render = () => {
  // Dynamically import our main App component, and render it
  const App = require("app/layout/App").default;

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    rootEl
  );
};

if (process.env.NODE_ENV !== "production") {
  if (module.hot) {
    // Support hot reloading of components.
    // Whenever the App component file or one of its dependencies
    // is changed, re-import the updated component and re-render it
    module.hot.accept("app/layout/App", () => {
      setTimeout(render);
    });
  }
}

render();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
