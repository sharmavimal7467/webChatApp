import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    userData:{}
}

const getUserDetailSlice = createSlice({
    name:"uerDate",
    initialState:initialState,
    reducers:{
        userDataFromGoggle:(state,action)=>{
            state.userData = action.payload
        }
    }
})

export const {userDataFromGoggle} = getUserDetailSlice.actions

export default getUserDetailSlice.reducer