import {  onAuthStateChanged } from "firebase/auth"
import { auth } from "../App"
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import{MyProduct} from '../Layout/MyProduct'

export const Home = ()=>{
    const [name, setName] = useState('')
   
    useEffect(()=>{
        onAuthStateChanged(auth, user=>{
          if(user){
            const user = auth.currentUser;
            const {displayName} = user;
            localStorage.setItem('displayName', JSON.stringify(displayName));
            setName(displayName);

          }
        })
      },[]);

    return(
        <>
        <div className="container-fluid">

           shop with us today
            

            <main>
              <MyProduct/>
            </main>
        </div>
        </>
    )
}