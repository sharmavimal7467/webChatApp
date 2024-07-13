import { Avatar } from "@mui/material";
import "./SidebarChatRoom.css"
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { findRoomIdByClick } from "../../redux/features/getRoomId/getRoomIdSlice";
import { getseedValueForAvatar } from "../../redux/features/getSeedValue/getSeedValueSlice";
import { addDoc, collection, doc, getDocs, getFirestore, onSnapshot, orderBy, serverTimestamp} from "firebase/firestore";
import { getDatabase, onValue, set, push, query } from "firebase/database";



const SidebarChatRoom = ( {id , name , addNewChat , onClick , lstMsg}) =>{

    const[seed , setSeed] = useState('');
    // const[lastMessage ,setLastMessages] = useState([]);
    const[findLastMessage , setFindLastMessage] = useState('')

    useEffect(()=>{
        const seedImg = Math.floor(Math.random() * 5000)
        // console.log(seedImg);
        setSeed(seedImg)
    },[])

    const {roomId} = useParams()

    // console.log(roomId);

    const msg = useSelector(state=>state.getMsg)

    console.log(msg);
    console.log(msg.allMessages[0])

 useEffect(()=>{
    if(msg){
        console.log(msg);
        if(msg.allMessages[0]){
            console.log(msg.allMessages[0])
         if (msg.allMessages[0].length>=1){
             console.log(msg);
         
             console.log(msg.allMessages);
         
             console.log("last message",msg.allMessages[0][msg.allMessages[0].length-1])
         
             console.log("last message",msg.allMessages[0][msg.allMessages[0].length-1].lastMsg)
         
             setFindLastMessage(msg.allMessages[0][msg.allMessages[0].length-1].lastMsg)
            }
        }
       }
 },[msg])

 console.log(findLastMessage)


// console.log(lastMessage);



    

    
    const dispatch = useDispatch();


    function getIdFromTheSidebar(Id , seed){
        dispatch(findRoomIdByClick(Id))
        dispatch(getseedValueForAvatar(seed))
        //  console.log(Id)
     
     }

//    console.log(lstMsg)
//    console.log(name)

    return(
       <div>
         
    <NavLink to={`/rooms/${id}`}>
    <div className="SidebarChatRoomMain" onClick={()=>getIdFromTheSidebar(id , seed)}>

<Avatar src={`https://api.dicebear.com/8.x/pixel-art/svg?seed=${seed}`} />
<div className="SidebarChatRoomInfo">
<h2>{name}</h2>
{/* <p>{
    lastMsg ? lastMsg : "photo"
    }</p> */}
    {/* <p>last message...</p> */}
    {/* <p>{msg.allMessages[0][msg.allMessages[0].length-1].lastMsg}</p> */}
    <p>{findLastMessage}</p>
</div>
        </div>
    </NavLink>



   
    
    




      
       </div>
    )
}

export default SidebarChatRoom;