import "./Sidebar.css"
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Avatar, IconButton } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import SidebarChatRoom from "../SidebarChatRoom/SidebarChatRoom";
import { useEffect, useState } from "react";
import db, { auth } from "../../firebase"
import { collection, getDocs , addDoc, onSnapshot } from "firebase/firestore";



import {useNavigate, useParams } from 'react-router-dom';


import { signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { getValueForLogIn } from "../../redux/features/goToLogin/goToLoginSlice";
import { findRoomIdByClick } from "../../redux/features/getRoomId/getRoomIdSlice";





const Sidebar = () =>{

    const[rooms , setRooms] = useState([]);
    const[goToLogin , setGoToLogin] = useState(false);

    const userData = useSelector(state=>state.getUserData)

    

        const{roomId} = useParams()

        // console.log(roomId);



   
    const navigate = useNavigate();
    const dispatch = useDispatch();

//     const msg = useSelector(state=>state.getMsg)

// console.log(msg);

// console.log(msg.allMessages);



//ADD ROOM NAME
function createChat(){
    const roomName = prompt("please enter name for chat")
    if(roomName){
        //do something from db
         

// Add a new document with a generated id.
const setData = async() =>{
const docRef = await addDoc(collection(db, "rooms"), {
    name: roomName,
    // lastMessage:"roshan"
  });
//   console.log("Document written with ID: ", docRef);
//   console.log("Document written with ID: ", docRef.id);
}
setData();
    }
    
}

// useEffect(()=>{
//     console.log("check for useEffect set the msg")
//     const docRef = addDoc(collection(db, "rooms"), {
//         lastMessage:msg.allMessages,
//       });
// },[msg.allMessages])


// console.log("last message",msg.allMessages[msg.allMessages.length-1].message)


//GET REAL-TIME DATA FROM FIREBASE
useEffect(()=>{
const unsub = onSnapshot(collection(db, "rooms"), (querySnapshot) => {
    const updateRoom = querySnapshot.docs.map((doc) => (
        {
            id:doc.id,
            data:doc.data()
          }
        //   console.log(doc.id, " => ", doc.data());
    ));
    setRooms([updateRoom])
  });
//   return () =>unsub();
    },[])






function logOut(){
    signOut(auth)
    .then(()=>{
        // console.log("result logOut Successfully")
        setGoToLogin(true)
        navigate("/")
    })
    // .catch((error)=>console.log(error.message))
}

useEffect(()=>{
    dispatch(getValueForLogIn(goToLogin))
},[dispatch , goToLogin])

// const msg = useSelector(state=>state.getMsg)

// console.log(msg);

// console.log(msg.allMessages);

// console.log("last message",msg.allMessages[msg.allMessages.length-1].message)


// console.log(rooms);

    return(
        <div className="sidebar">

            <div className="sidebarHeader">
                   {
                   userData.userData.user && userData.userData.user.photoURL ? <Avatar src={userData.userData.user.photoURL}/>: <Avatar/>
                   }
                    <div className="sidebarHeaderRight">
                            <IconButton>
                            <DonutLargeIcon/>
                            </IconButton>

                            <IconButton>
                            <ChatIcon/>
                            </IconButton>
                           
                            <IconButton>
                            <MoreVertIcon/>
                            </IconButton>
                            
                            
                    </div>
            </div>

            <div className="sidebarSearch">
                    
                    <div className="sidebarSeachContainer">
                    <SearchIcon/>
                    <input placeholder="Search or start new chat" type="text"/>
                    </div>
            </div>

            <div className="sidebarChatRoom">
            <h1 className="addNewChat" onClick={createChat}>Add New Chat</h1>
              
                {
                    rooms.length>0 && rooms[0] &&  rooms[0].map(room =>(
                        <SidebarChatRoom key={room.id} id={room.id} name={room.data.name} lstMsg = {room.data.lastMsg}/>

                        // lastMsg = {msg.allMessages[msg.allMessages.length-1].message}

                        // onClick={}
                    ))
                }
                   

            </div>

            
      
        <div onClick={logOut} className="logOutBtn">Log Out</div>

        </div>
    )
    }

export default Sidebar