import { doc, deleteDoc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { db, colRef, storage  } from "../App";
import { deleteObject, getMetadata, ref } from "firebase/storage"
import { AuthConsumer } from "../Context/ContextAuth/AuthConsumer"

export const ProductTemp = ()=>{
    const {id} = useParams();
    const [tempData, setTempData] = useState(null);
    const [warn, setWarn] = useState(false);
    const {user} = AuthConsumer();
    useEffect(()=>{
        const fetchData = async ()=>{
        const docRef = doc(db, 'vendor', id);
        try{
            const docSnap = await getDoc(docRef)
            if(docSnap.exists()){
                const data = {...docSnap.data(), id: docSnap.id}
                console.log(data);
                setTempData(data)
            }
        }catch(error){
            console.error(error)
        }
    }
        fetchData()
    },[id])



    const handleDelete =  ()=>{
        const fileStorage = ref(storage, tempData.imagePath);
        if(fileStorage){
            console.log('wey')
            const metaData = getMetadata(fileStorage).then(()=>{
                deleteObject(fileStorage);
            }).catch(error=>{
                if(error){
                    const docRef = doc(colRef, tempData.id);
                    deleteDoc(docRef);
                }
                console.log(error);
                return
            })
        const docRef = doc(colRef, tempData.id);
        deleteDoc(docRef);
            }
            const docRef = doc(colRef, tempData.id);
            deleteDoc(docRef);
        }
    return(
        <>
            {
                tempData && 
            <main className="gridProduct">
                    
            <div className="product">
            <div className="productImage">
             <img src={tempData.productImage} alt="image"/>
            </div>
             <div className="productDetail">
                <div>{tempData.product}</div>
                <div>price: {tempData.prize}</div>
                
                <div>
                    <button className="full-btn">Add to cart</button>
                </div>

                {user && user.uid === process.env.REACT_APP_acceptedID && <button className="outline-btn" onClick={()=>setWarn(true)}>delete</button>}
                { user && warn && <div> <div>are you sure to delete</div> <button className="outline-btn" onClick={handleDelete}>yes</button> <button className="full-btn" onClick={()=>setWarn(false)}>no</button></div>}
            
             </div>

        </div>
                    
                </main>
            }
        </>
    )
}