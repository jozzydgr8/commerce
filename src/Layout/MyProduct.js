import { useEffect } from "react";
import{ onSnapshot, query, where} from 'firebase/firestore';
import { colRef } from "../App";
import { UseContextData } from "../Context/ContextAuth/ContextProvider/UseContextData";
import { MyProductArray } from "./MyProductArray";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';


export const MyProduct = ()=>{
    const {data, dispatch} = UseContextData();
    const displayName = JSON.parse(localStorage.getItem('displayName'));
    // const q = query(colRef, where('productOwner', '==', displayName ));
  
    useEffect(()=>{
      onSnapshot(colRef, (snapshot)=>{
        const data = []
        const dataRef = snapshot.docs.forEach(doc=>{
          data.push({...doc.data(), id:doc.id});
          console.log(data);
          dispatch({type:'getData', payload:data})
        });
      });
  
    },[]);

    return(
        <div>
          <h1>Products you have uploaded </h1>
            {
                data && data.map((data)=>(
                    <MyProductArray key={data.id} data={data}/>
                ))
            }
        </div>
    )
}