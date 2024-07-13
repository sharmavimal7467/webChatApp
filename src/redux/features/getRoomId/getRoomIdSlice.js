import { createSlice } from "@reduxjs/toolkit";

const initialState={
    roomId:null
}

const getRoomIdSlice = createSlice({
 name:"roomId",
 initialState:initialState,
 reducers:{
    findRoomIdByClick:(state , action)=>{
        state.roomId = action.payload
    }
 }
})

 export const {findRoomIdByClick} = getRoomIdSlice.actions

export default getRoomIdSlice.reducer