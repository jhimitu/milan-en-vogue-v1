import React from "react";
import PostsList from "../features/posts/PostsList";
import CreatePostForm from "../features/posts/CreatePostForm";
import BlogPost from "../features/posts/BlogPost";
import Layout from "../components/Layout";
import EditPostForm from "../features/posts/EditPostForm";
import { Routes, Route } from "react-router-dom";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<PostsList />}/>
                <Route path="post">
                    <Route index element={<CreatePostForm/>} />
                    <Route path=":postId" element={<BlogPost />}/>
                    <Route path="edit/:postId" element={<EditPostForm />}/>
                </Route>
            </Route>
        </Routes>
    );
}

export default App;