import React from "react";
import PostsList from "../features/posts/PostsList";
import CreatePostForm from "../features/posts/CreatePostForm";

function App() {
    return (
        <main className="App">
            <CreatePostForm />
            <PostsList />
        </main>
    );
}

export default App;