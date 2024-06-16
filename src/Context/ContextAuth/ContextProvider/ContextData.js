import { createContext, useReducer } from "react";

export const contextProvider = createContext();

const reducer = (state, action)=>{
    switch(action.type){
        case 'getData':
            return{
                ...state, data:action.payload
            }
    }
}

export const ContextData = ({children})=>{
    const [state, dispatch] = useReducer(reducer, {data:null});

    return(
        <contextProvider.Provider value={{...state, dispatch}}>
            {children}
        </contextProvider.Provider>
    )
}
