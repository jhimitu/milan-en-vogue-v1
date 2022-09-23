import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import axios from "axios";

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

const initialState = {
    posts: [],
    status: 'idle',
    error: null
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    try {
        const res = await axios.get(POSTS_URL)
        return [...res.data];
    } catch (err) {
        return err.message;
    }
})

export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost) => {
    try {
        const res = await axios.post(POSTS_URL, initialPost)
        return res.data;
    } catch (err) {
        return err.message;
    }
})

export const updatePost = createAsyncThunk('posts/updatePost', async (initialPost) => {
    const { id } = initialPost;
    try {
        const res = await axios.put(`${POSTS_URL}/${id}`, initialPost)
        return res.data;
    } catch (err) {
        return err.message;
    }
})

export const deletePost = createAsyncThunk('posts/deletePost', async (initialPost) => {
    const { id } = initialPost;
    try {
        const response = await axios.delete(`${POSTS_URL}/${id}`)
        if (response?.status === 200) return initialPost;
        return `${response?.status}: ${response?.statusText}`;
    } catch (err) {
        return err.message;
    }
})

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        createPost: {
            reducer(state, action) {
                state.push(action.payload)
            },
            prepare(title, content, userId) {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content,
                        date: new Date().toISOString(),
                        userId
                    }
                }
            }
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.status = "loading"
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = "succeeded"
                let min = 1;
                const loadedPosts = action.payload.map(post => {
                    post.date = sub(new Date(), { minutes: min++ }).toISOString()
                    return post;
                });
                state.posts = state.posts.concat(loadedPosts)
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.err.message
            })
            .addCase(addNewPost.fulfilled, (state, action) => {
                action.payload.userId = Number(action.payload.userId)
                action.payload.date = new Date().toISOString();
                state.posts.push(action.payload)
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    console.log("Update could not complete")
                    console.log(action.payload)
                    return;
                }
                const { id } = action.payload;
                action.payload.date = new Date().toISOString();
                const posts = state.posts.filter(post => post.id !== id);
                state.posts = [...posts, action.payload];
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    console.log('Delete could not complete')
                    console.log(action.payload)
                    return;
                }
                const { id } = action.payload;
                const posts = state.posts.filter(post => post.id !== id);
                state.posts = posts;
            })
    }
})

export const selectAllPosts = (state) => state.posts;
export const selectPostById = (state, postId) => state.posts.posts.find(post => post.id === postId);
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;

const { actions, reducer } = postsSlice

export const { createPost } = actions

export default reducer