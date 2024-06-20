import {NavLink} from "react-router-dom";
import { auth } from "../App";
import { signOut } from "firebase/auth";
import { AuthConsumer } from "../Context/ContextAuth/AuthConsumer";
import { UseContextData } from "../Context/ContextAuth/ContextProvider/UseContextData";
import { useEffect } from "react";
export const Navbar = ()=>{
    const {dispatch:deleteData}= UseContextData();
    const {dispatch, user} = AuthConsumer();
    const handleLogOut = ()=>{
        signOut(auth)
        .then(()=>{
            dispatch({type:'signUser', payload:null}); 
        })
    }

    return(
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <NavLink className="navbar-brand ubuntu" to="/commerce">trade</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className="nav-link active" aria-current="page" to="/commerce">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link active" aria-current="page" to="/commerce/cart">carts</NavLink>
            </li>
            <li className="nav-item">
            {user ? <button className="outline-btn" onClick={handleLogOut}>logout</button> : <NavLink to='signin' className=" full-btn">sign in</NavLink> }
            </li>
          </ul>
        </div>
      </div>
    </nav>


    )
}