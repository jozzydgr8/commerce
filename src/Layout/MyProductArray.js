import { deleteDoc, doc } from "firebase/firestore"
import { colRef, storage } from "../App"
import { useState } from "react"
import { deleteObject, getMetadata, ref } from "firebase/storage"
import { AuthConsumer } from "../Context/ContextAuth/AuthConsumer"

export const MyProductArray = ({data})=>{

    const [warn, setWarn] = useState(false);
    const {user} = AuthConsumer();
    const handleDelete = ()=>{
                const fileStorage = ref(storage, data.imagePath);
                const metaData = getMetadata(fileStorage)
                .then(()=>{
                    const docRef = doc(colRef, data.id);
                    deleteDoc(docRef);
                    if(metaData){
                        deleteObject(fileStorage);
                        console.log('deleted successfully')
                    }else{console.log('file doesnt exist')}
                    
                });
            
    }
    return(
        <div className="product">
            <div className="productImage">
             <img src={data.productImage} alt="image"/>
            </div>
             
             <div className="productDetail">
                <div>{data.product}</div>
                <div>price: {data.prize}</div>
                
                <div>
                    <button className="full-btn">Add to cart</button>
                </div>

                {user && <button className="outline-btn" onClick={()=>setWarn(true)}>delete</button> }
                { user && warn && <div> <div>are you sure to delete</div> <button className="outline-btn" onClick={handleDelete}>yes</button> <button className="full-btn" onClick={()=>setWarn(false)}>no</button></div>}
            
             </div>

        </div>
    )
}