import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allMessages : []
}


const getMessagesSlice = createSlice({
    name:"getLastMessage",
    initialState:initialState,
    reducers:{
        getLastMessageFromAll:(state,action)=>{
                state.allMessages = [action.payload]
        }
    }
})

export const {getLastMessageFromAll} = getMessagesSlice.actions

export default getMessagesSlice.reducer