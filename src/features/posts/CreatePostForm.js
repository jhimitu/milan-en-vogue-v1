import React , { useState } from 'react';
import { useDispatch } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';

import { createPost } from './postsSlice';

const CreatePostForm = () => {
    const dispatch = useDispatch()
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const onTitleChanged = e => setTitle(e.target.value)
    const onContentChanged = e => setContent(e.target.value)

    const onSavePost = () => {
        if (title && content) {
            dispatch(
                createPost({
                    id: nanoid(),
                    title,
                    content
                })
            )

            setTitle('')
            setContent('')
        }
    }

    return (
        <section>
            <h2>Add a New Post</h2>
            <form>
                <label htmlFor="postTitle">Post Title:</label>
                <input 
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    value={title}
                    onChange={onTitleChanged}
                />
                <label htmlFor="postContent">Content:</label>
                <textarea 
                    id="postContent"
                    name="postcontent"
                    value={content}
                    onChange={onContentChanged}
                />
                <button 
                    type="button"
                    onClick={onSavePost}
                >Save Post</button>
            </form>
        </section>
    )
}

export default CreatePostForm