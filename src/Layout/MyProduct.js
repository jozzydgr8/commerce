import { useEffect } from "react";
import{ onSnapshot} from 'firebase/firestore';
import { colRef } from "../App";
import { UseContextData } from "../Context/ContextAuth/ContextProvider/UseContextData";
import { MyProductArray } from "./MyProductArray";


export const MyProduct = ()=>{
    const {data, dispatch} = UseContextData();
  
    useEffect(()=>{
    const unSubscribe = onSnapshot(colRef, (snapshot)=>{
        const data = []
        const dataRef = snapshot.docs.forEach(doc=>{
          data.push({...doc.data(), id:doc.id});
          dispatch({type:'getData', payload:data})
        });
      });
      return ()=> unSubscribe();
    },[]);

    return(
          <div className="gridProduct">
            {
                data && data.map((data)=>(
                    <MyProductArray key={data.id} data={data}/>
                ))
            }
          </div>
    )
}