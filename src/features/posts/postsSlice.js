import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    { id: '1', title: "I Went to NYFW on a Whim. Here's How It Went", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},
    { id: '2', title: "My First 3 Months Sewing", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}

]

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        createPost(state, action) {
            state.push(action.payload)
        }
    }
})

export const selectAllPosts = (state) => state.posts

const { actions, reducer } = postsSlice

export const { createPost } = actions

export default reducer