import {  onAuthStateChanged } from "firebase/auth"
import { auth } from "../App"
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export const Admin  = ({name})=>{

    return(
        <>
        <div className="container-fluid">
           <h1> <strong>Hey there</strong>, here is a resume of where {name} is at</h1>
            <p>yours to do</p>
            <div className="homefeatures">
             <Link to='uploadproduct'>uploadproduct
             <p>you have new product to sale!</p>
             <p>click to upload product </p>
             </Link>
            </div>
            
        </div>
        </>
    )
}