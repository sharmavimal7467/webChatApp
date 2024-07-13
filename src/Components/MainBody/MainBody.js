
import { useSelector } from "react-redux";
import Chat from "../Chat/Chat"
import Sidebar from "../Sidebar/Sidebar"
import "./MainBody.css"
import {Route, Routes, useParams} from 'react-router-dom';

const MainBody = () => {

    const {roomId} = useParams()

    // console.log(roomId);

// const roomIdForUrl = useSelector(state=>state.getRoomId)



    return (
        <div className="fullBody">
            <div className="appBody">
                

            <Sidebar/>

             
                    <Routes>
                
                <Route exact path="/rooms/:roomId" element={<Chat/>} />
                </Routes>

            </div>
        </div>
    )
}

export default MainBody