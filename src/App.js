import { initializeApp } from "firebase/app";
import { useEffect } from "react";
import {getFirestore, collection, onSnapshot} from "firebase/firestore"
import {getAuth} from 'firebase/auth'
import {getStorage} from 'firebase/storage'
import { Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import {AuthConsumer} from './Context/ContextAuth/AuthConsumer';
import { UseContextData } from "./Context/ContextAuth/ContextProvider/UseContextData";


//LAYout
import { Root } from "./Layout/Root";
//pAGes
import { Home } from "./Pages/Home";
import { Signup } from "./Pages/Signup";
import { Signin } from "./Pages/Signin";
import {UploadProduct} from "./Pages/UploadProduct"
import { ProductTemp } from "./Layout/ProducTemp";
import { Cart } from "./Layout/Cart";


// init firebase
const firebaseConfig = {
  apiKey: "AIzaSyBCYEeE-N22ytQWInLLo9_w8jQPVSliKr0",
  authDomain: "commercetemp-68d9d.firebaseapp.com",
  projectId: "commercetemp-68d9d",
  storageBucket: "commercetemp-68d9d.appspot.com",
  messagingSenderId: "809173166381",
  appId: "1:809173166381:web:ae520ef4ed6cc9701b8ba4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//auth
export const auth = getAuth();
export const db = getFirestore();
export const colRef = collection(db, 'vendor');
export const storage = getStorage(app)


function App() {
  const {user, loading} = AuthConsumer();
  const {dispatch, loading:load} = UseContextData();
  useEffect(()=>{
    dispatch({type:'loading', payload:true})
    const unSubscribe = onSnapshot(colRef, (snapshot)=>{
        const data = []
        const dataRef = snapshot.docs.forEach(doc=>{
          data.push({...doc.data(), id:doc.id});
          dispatch({type:'getData', payload:data});
        });
      });
      return ()=> unSubscribe();
    },[]);
  if(loading || load){
    return <div>...loading</div>
  }

  //router
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Root/>}>
        <Route index element={<Home />} />
        <Route path="signup" element={!user ? <Signup/>: <Navigate to={'/'} />} />
        <Route path='signin' element={!user ? <Signin />: <Navigate to ={'/'}/>} />
        <Route path="uploadproduct" element ={user ? <UploadProduct />: <Navigate to={'/signin'} />} />
        <Route path=":id" element={<ProductTemp />} />
      </Route>
      <Route path="/commerce" element={<Root/>}>
        <Route index element={<Home />} />
        <Route path="signup" element={!user ? <Signup/>: <Navigate to={'/commerce'} />} />
        <Route path='signin' element={!user ? <Signin />: <Navigate to ={'/commerce'}/>} />
        <Route path="uploadproduct" element ={user ? <UploadProduct />: <Navigate to={'signin'} />} />
        <Route path=":id" element={<ProductTemp />} />
        <Route path={"cart"} element={<Cart/>} />
      </Route>
      </>

      

    )
  )
  return (
    <div className="App"> 
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
