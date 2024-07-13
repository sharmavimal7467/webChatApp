
import { Avatar, IconButton } from "@mui/material";
import "./Chat.css"
import { createRef, useCallback, useEffect, useRef, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MicIcon from '@mui/icons-material/Mic';
import { useParams } from "react-router-dom";
import { getDatabase, onValue, set, push, query } from "firebase/database";
import { addDoc, collection, doc, getDocs, getFirestore, onSnapshot, orderBy, serverTimestamp} from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import db from "../../firebase";
// import db from "../../firebase";
import firebase from "firebase/compat/app";
import { getLastMessageFromAll } from "../../redux/features/getMessages/getMessagesSlice";

//  import {ref} from "firebase/firestore"
import { imageDb } from "../../firebase";
import { v4 as uuidv4 } from 'uuid';

import EmojiPicker from 'emoji-picker-react';
// import { Picker } from "emoji-mart";
import Picker from '@emoji-mart/react'
import data from '@emoji-mart/data'
// import 'emoji-mart/css/emoji-mart.css';
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";


const Chat = () => {

    // let par = document.querySelector("em-emoji-picker")
    // console.log(par)

    const [seed, setSeed] = useState('');
    const[inputTextValue , setInputTextValue] = useState("")
    const [messages, setMessages] = useState([]);
    const {roomId} = useParams();
    const[nameRoom,setNameRoom] = useState("")
    const[time,setTime] = useState("");
    const[secTime,setSecTime] = useState(null);
    const[nanoTime , setNanoTime] = useState(null)
    const[lastSeen , setLastSeen] = useState(null)
    const[showEmoji , setShowEmoji] = useState(false)
    const[cursorPosition,setCursorPosition] = useState()
    const[uploadImgInChat , setUploadImgInChat] = useState(null)
    const[getUrls , setGetUrls] = useState([])
    // const inputRef = createRef()
    const inputRef = useRef()
    const fileInputRef = useRef(null);


    const dispatch = useDispatch()

    // useEffect(()=>{
    //     setTime(new Date());
    // },[])

    

    const options = {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: 'numeric', minute: 'numeric', second: 'numeric',
        hour12: false, // Use 24-hour format
        timeZoneName: 'short' // Include abbreviated timezone name
    };

    



    useEffect(() => {
        if (roomId) {
        const db = getFirestore();

        // Access the collection and document using Firestore API
        const roomRef = doc(db, 'rooms', roomId);
        
        // Listen for changes in the document
        const unsubRoom = onSnapshot(roomRef, (snapshot) => {
            if (snapshot.exists()) {
            const data = snapshot.data();
            // console.log(data,"get msg from firebase");
            setNameRoom(data.name);
            // console.log(data)
            } else {
            // console.log('Document does not exist');
            // Handle case where document does not exist
            }
        });

        const msgRef = collection(roomRef,'messages');
        const q = query(msgRef, orderBy('timestamp', 'asc'));

        let unsubMsg

        getDocs(q).then((querySnapshot)=>{
            if(querySnapshot.size > 0){
               unsubMsg =  onSnapshot(q , (snapshot)=>{
                    const newMessages = [];
                    snapshot.forEach((doc)=>{
                        const msgData = doc.data();
                    // console.log(msgData)
                    newMessages.push(msgData)
                    // dispatch(getLastMessageFromAll(msgData));
                    // console.log(newMessages)
                    })
                // dispatch(getLastMessageFromAll(newMessages));
        
                    // setMessages([...messages , ...newMessages])
                    setMessages([...newMessages])
                })
            }
            else{
                // console.log('Messages subcollection either does not exist or is empty');
            }
        })
        .catch((error)=>{
            // console.error('Error getting room document:', error);
        })

        return () => {
            unsubRoom();
          if(unsubMsg){
            unsubMsg();
          }
        };

       
    }
    // dispatch(getLastMessageFromAll(messages));
    }, [roomId]);

    // console.log(messages);
   
    useEffect(()=>{
        dispatch(getLastMessageFromAll(messages));
    },[messages])


    // Clear messages when roomId changes
    // useEffect(() => {
    //     setMessages([]); 
    // }, [roomId]);

    // useEffect(()=>{
    //     dispatch(getLastMessageFromAll(messages))
    // },[messages])



    // console.log("msg array",messages);


const userData = useSelector(state=>state.getUserData)

// console.log(userData)
// console.log(userData.userData.user)
// console.log(userData.userData.user.displayName)

const userDisplayName = userData.userData.user.displayName


const sameSeedImg = useSelector(state=>state.getImg)

// console.log(sameSeedImg);

// console.log(sameSeedImg.seedText);

const sameAvatarImg = sameSeedImg.seedText;

const msg = useSelector(state=>state.getMsg)

// useEffect(()=>{
   

// console.log(msg);

// console.log(msg.allMessages[msg.allMessages.length-1]); 
// },[])  



    function submitForm(e){

        e.preventDefault();
             
        // console.log("last msg",inputTextValue);
        // dispatch(getLastMessageFromAll(inputTextValue));

           try{
                addDoc(collection(db, `rooms/${roomId}/messages`), {
                message: inputTextValue,
                name: userDisplayName,
                timestamp: serverTimestamp(),
                lastMsg:inputTextValue,
                // lastMsg:
                // uploadImg: "https://unsplash.com/photos/a-bird-flying-in-the-air-with-a-sky-background-c18fclg_o58"
                // firebase.firestore.FieldValue.
                
              });
            //   dispatch(getLastMessageFromAll(inputTextValue));
            // console.log('Message added successfully!');
           }
           catch(error){
            // console.error('Error adding message: ', error);
           }
       
        setInputTextValue("");

        setShowEmoji(false)

        // setMessages([]);
    }


    function changeInputValue(e){

        setInputTextValue(e.target.value);
    }
  


  

    
  
    function pickedEmoji(emoji){
        // console.log(emoji);
         const Emojiref = inputRef.current;
        const start = inputTextValue.substring(0,Emojiref.selectionStart)
        const end = inputTextValue.substring(Emojiref.selectionStart)
        const text = start+emoji+end;
        setInputTextValue(text);
        Emojiref.focus();
        setCursorPosition(start.length+emoji.length)
    }

    useEffect(()=>{
    inputRef.current.selectionEnd = cursorPosition
    },[cursorPosition])

    function handleFileChange(e){
        // console.log(e.target.files)
        // console.log(e.target.files[0])
        // console.log(e.target.files[0].name)
        setUploadImgInChat(e.target.files[0])
         }

    const handleIconClick = () => {
      fileInputRef.current.click();

      };

      useEffect(()=>{
        // console.log(uploadImgInChat)
        
        if(uploadImgInChat !== null){
            const imageRef = ref(imageDb , `files/${uuidv4()}`);
        uploadBytes(imageRef , uploadImgInChat).then(value=>{
            // console.log(value)
            getDownloadURL(value.ref).then(url=>
            {
                // console.log(url)
                addDoc(collection(db, `rooms/${roomId}/messages`), {
                    messageImage: url,
                    name: userDisplayName,
                    timestamp: serverTimestamp(),
                  })
                //   console.log("image upload successfully")
            setGetUrls(preUrls=>[...preUrls,url])
            }
            )
        })
        }
        setUploadImgInChat(null)
      },[imageDb, uploadImgInChat])



      useEffect(()=>{
       const receiveImg = ref(imageDb , "files")
    //    console.log(receiveImg)
       listAll(ref(imageDb , "files"), orderBy('timestamp', 'asc')).then(imgs=>{
        // console.log(imgs)
        imgs.items.forEach(val=>{
            getDownloadURL(val).then(url=>{
                // console.log(url)

               })
        })
       })
      },[])
      
    //   console.log(getUrls);

      function getEmoji(){
        
        inputRef.current.focus()
        // if(showEmoji === false){
        //     emojiHandler()
        // }
        
        setShowEmoji(!showEmoji)
    }


       function emojiHandler(){
            let par = document.querySelector("em-emoji-picker")
            // console.log(par);

            const shadowRoot = par.shadowRoot;
            // console.log(shadowRoot);

            const rootSection = shadowRoot.querySelector('#root');
            // console.log(rootSection);
            rootSection.style.width="100vw !important" ;
            rootSection.style.position="absolute";
            rootSection.style.height="100px"
      }




    return (
        <div className="chat">

            <div className="chatHeader">
                {/* <div className="chatHeaderDetail"> */}
                    <Avatar src={`https://api.dicebear.com/8.x/pixel-art/svg?seed=${sameAvatarImg}`} />

                    <div className="chatHeaderInfo">
                        <h3>{nameRoom}</h3>
                    

<p> last seen at 
        {
           new Date(
             new Date(messages[messages.length-1]?.timestamp?.toDate())
             .toUTCString()
            ).toLocaleString('en-US', options)
           .slice(
            0,new Date(
                new Date(messages[messages.length-1]?.timestamp?.toDate())
                .toUTCString()
        ).toLocaleString('en-US', options).indexOf(":") + 3
           )
            
        }
    </p>

                    </div>
                {/* </div> */}

                <div className="chatHeaderRight">
                    <IconButton>
                        <SearchIcon />
                    </IconButton>


                  


                    
                    <label for="file-upload" class="icon-label">
    <IconButton onClick={handleIconClick}>
                    <AttachFileIcon />
                    </IconButton>
                    
    <input type="file" id="file-upload"  ref={fileInputRef} className="fileUpload" 
     onChange={handleFileChange}/>

</label>

{/* <input type="file" onChange={handleFileChange}/>
<button onClick={handleIconClick} className="BtnUpload">click to upload</button> */}


                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>

            </div>

            <div className="chatBody">

            {showEmoji && (
                <div className="emoji-picker-container">
                  <Picker className="pickerEmoji"
                    data={data} 
                    previewPosition="none" 
                    onEmojiSelect={(e) => pickedEmoji(e.native)}
                />
                 </div>
            )}

                    <div className={`chatBodyMsg  ${true && "chatBodyMsgReceiver"}`}>
                       <p>
                       <span className="chatBodyMsgName">Vihaan</span>
                       Guyshghirhgrkghkfhgkhg;khgkjkdhkdkjhgkhglfkhkdfhbkhgeibdfjhbdfjbjdfgdjfljdhjgdoutq3iddmmcldncegrfpi3yudfdmv'dhgrryt0kkgfnbkdfpisryogridjhghgkhdkhfkhdyfjvkdiyyfljhditrghcioukhditok'kl;kkduresiytiph
                       <span className="chatBodyMsgTimeStamp">15:26</span>
                       </p>
                    </div>

                                       
                    <p>
                         {messages.map((message, index) => {

const utcString = new Date(message.timestamp?.toDate()).toUTCString();

// console.log(utcString);

const localDate = new Date(utcString);



const localTimestamp = localDate.toLocaleString('en-US', options);

// console.log("Local Timestamp:", localTimestamp);


let showTime = localTimestamp.indexOf(":") + 3;

                            return(
                                <div className={`chatBodyMsg  ${message.name === userDisplayName && "chatBodyMsgReceiver"}`} key={index}>
                          
                      
                            <span className="chatBodyMsgName">{message.name}</span>
                            {message.message? message.message : <img src={message.messageImage} alt="Img_NOt_Found" className="sendImageInChat"/>}
                            <span className="chatBodyMsgTimeStamp">{
                        localTimestamp.slice(0,showTime)
                            }
                            </span>
                       
                    </div>
                            )

                         })}
               
                </p>
                {/* {
              
                showEmoji && <Picker data={data}previewPosition="none" onEmojiSelect={(e)=>pickedEmoji(e.native)}/>

                } */}
            </div>
           

            <div className="chatFooterMain">
            {/* {
                 showEmoji && <Picker data={data} previewPosition="none" onEmojiSelect={(e)=>pickedEmoji(e.native)} />
                 }  */}


            
       

                <div className="chatFooter">
                <InsertEmoticonIcon onClick={getEmoji}/>

<form onSubmit={submitForm}>
    <input type="text" placeholder="Type a message" value={inputTextValue} onChange={changeInputValue} ref={inputRef}/>
    <button type="submit">send Msg</button>
</form>


<MicIcon/>
                    </div>
            </div>

        </div>
    )
}

export default Chat;