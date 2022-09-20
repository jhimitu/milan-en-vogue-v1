import ReactDOM from "react-dom";
import React from "react";
import App from './App';
import { store } from "./app/store";
import { Provider } from "react-redux";

const container = document.getElementById("app");
const root = ReactDOM.createRoot(container);

root.render(
    <Provider store={store}>
        <App />
    </Provider>, 
container);