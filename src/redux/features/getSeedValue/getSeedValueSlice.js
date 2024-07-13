import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    seedText:null
}


const seedValueForAvatar= createSlice({
    name:"findSeed",
    initialState:initialState,
    reducers:{
        getseedValueForAvatar:(state,action)=>{
                state.seedText = action.payload
        }
    }
})

export const {getseedValueForAvatar} = seedValueForAvatar.actions

export default seedValueForAvatar.reducer