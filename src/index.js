import ReactDOM from "react-dom/client";
import React from "react";
import App from "./app/App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { fetchPosts } from "./features/posts/postsSlice";
import { fetchUsers } from "./features/users/usersSlice";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

store.dispatch(fetchPosts());
store.dispatch(fetchUsers());

const container = document.getElementById("app");
const root = ReactDOM.createRoot(container);

root.render(
    <Provider store={store}>
        <Router>
            <Routes>
                <Route path="/*" element={<App />}></Route>
            </Routes>
        </Router>
    </Provider>);