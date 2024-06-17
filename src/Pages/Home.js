import {  onAuthStateChanged } from "firebase/auth"
import { auth } from "../App"
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import{MyProduct} from '../Layout/MyProduct'
import { Admin } from "./Admin";

export const Home = ()=>{
    const [name, setName] = useState('');
    const [userId, setUserId] = useState('');
   
    useEffect(()=>{
        onAuthStateChanged(auth, user=>{
          if(user){
            const user = auth.currentUser;
            const {displayName, uid} = user;
            localStorage.setItem('displayName', JSON.stringify(displayName));
            setName(displayName);
            setUserId(uid);

          }
        })
      },[]);

    return(
        <>
        <div className="container-fluid">
          {userId == process.env.REACT_APP_acceptedID?<Admin name={name}/>:<div>shop with us</div>}
           
            <main>
              <MyProduct/>
            </main>
        </div>
        </>
    )
}