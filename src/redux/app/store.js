import { configureStore } from "@reduxjs/toolkit";
import valueForLogIn from "../features/goToLogin/goToLoginSlice"
import valueOfUser from "../features/getUserDetails/getUserDetailsSlice"
import findRoomId from "../features/getRoomId/getRoomIdSlice"
import getTheMsg from "../features/getMessages/getMessagesSlice"
import getseedImg from "../features/getSeedValue/getSeedValueSlice"


const store = configureStore({
    reducer:{
     geLogInValue:valueForLogIn,
     getUserData:valueOfUser,
     getRoomId:findRoomId,
     getMsg:getTheMsg,
     getImg:getseedImg
    }
})


export default store;



// Local:            http://localhost:3000        
// On Your Network:  http://192.168.1.4:3000 

