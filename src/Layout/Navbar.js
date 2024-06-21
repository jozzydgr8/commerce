import {NavLink} from "react-router-dom";
import { auth, setLocalStorageItem } from "../App";
import { signOut } from "firebase/auth";
import { AuthConsumer } from "../Context/ContextAuth/AuthConsumer"; 
import { useEffect, useState } from "react";
export const Navbar = ()=>{
    const {dispatch, user} = AuthConsumer();
    const [count, setCount] = useState(0);
    
    useEffect(()=>{
      const updateCount = ()=>{
        const cart = JSON.parse(localStorage.getItem('cart'));
        setCount(cart ? cart.length:0);

      };
      //initial load
      updateCount();

      //update storage event
       const handleStorageUpdate = ()=>{
        updateCount();
       };

       window.addEventListener('storageUpdate', handleStorageUpdate);

       return ()=>{
        window.removeEventListener('storageUpdate', handleStorageUpdate)
       }

    },[])
  
    const handleLogOut = ()=>{
        signOut(auth)
        .then(()=>{
            const emptyCart = [];
            setLocalStorageItem('cart',JSON.stringify(emptyCart))
            dispatch({type:'signUser', payload:null}); 
        })
    }

    return(
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <NavLink className="navbar-brand ubuntu" to="/commerce">trade</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
          { count > 0 &&<span className='togglerbadge'>{' '}</span>}
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">

            <li className="nav-item">
              <div></div>
              <NavLink className="nav-link active" aria-current="page" to="/commerce/cart">carts{ count > 0 &&<span className='badge'>{count}</span>}</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link active" aria-current="page" to="/commerce">Home</NavLink>
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