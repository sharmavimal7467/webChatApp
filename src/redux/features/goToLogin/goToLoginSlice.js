import { createSlice } from "@reduxjs/toolkit";

const initialState={
    valueForLogin : null
}

const goToLoginSlice = createSlice({
    name:"findLoginValue",
    initialState:initialState,
    reducers:{
        getValueForLogIn:(state,action)=>{
            state.valueForLogin = action.payload
        }
    }
})

export const {getValueForLogIn} = goToLoginSlice.actions

export default goToLoginSlice.reducer