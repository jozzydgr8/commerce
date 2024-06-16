
import { createContext, useEffect, useReducer } from "react";


export const Context = createContext();

const reducer = (state, action)=>{
    switch(action.type){
        case'signUser':
            return{
                ...state, user:action.payload
            }
        default:
            return state
    }
}

export const ContextAuth=({children})=>{
    const [state, dispatch] = useReducer(reducer, {user:null} )
    useEffect(()=>{
            const signedUser = JSON.parse(localStorage.getItem('user'));
            if(signedUser){
              dispatch({type:'signUser', payload:signedUser});
            } 

    },[]);
    // console.log(state)
    return(
        <Context.Provider value={{...state, dispatch}}>
            {children}
        </Context.Provider>
    )
}