import { useEffect, useState } from 'react';
import './App.css';
import MainBody from './Components/MainBody/MainBody';
import logo from "./Assets/logo.png"
import { signInWithPopup } from 'firebase/auth';
import { auth, provider} from './firebase';
import { Route, Routes, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userDataFromGoggle } from './redux/features/getUserDetails/getUserDetailsSlice';

const  App =() =>{
  const[show,setShow]=useState(true);
  const dispatch = useDispatch();

  const getLogData = useSelector(state=>state.geLogInValue)
// console.log(getLogData.valueForLogin)

useEffect(() => {
  if (getLogData.valueForLogin === true) {
    setShow(true);
    // console.log("if condition");
  } else if (getLogData.valueForLogin === false) {
    setShow(false);
    // console.log("else condition");
  }
}, [getLogData.valueForLogin]);

const {roomId} = useParams()

// console.log("roomId",roomId);


  function signInWithGoggle(){
            signInWithPopup(auth,provider)
            .then((result)=>{
              dispatch(userDataFromGoggle(result))
              // console.log(result)
                setShow(false)
            })
            .catch((error)=>alert(error.message))
  }

  // console.log(show,"32");

  return (
    <div>
      {
        show ? ( 
          <div className="app">
          <div className='logInCard'>
           <h1>What's App Login</h1>
           <img src={logo} alt="not Found"/>
           <button onClick={signInWithGoggle}><span className="btnText">Sign in with goggle</span></button>
        </div>
         </div>
        ): <MainBody/>
      }
      {/* <MainBody/> */}
    </div>
  );
}

export default App;
