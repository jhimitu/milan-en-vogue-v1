import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    { id: '0', name: 'Sarafina B.'},
    { id: '1', name: 'Adrianna C.'},
    { id: '2', name: 'Christina D.'}
]

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {

    }
})

export const selectAllUsers = (state) => state.users;

const { reducer } = usersSlice

export default reducer