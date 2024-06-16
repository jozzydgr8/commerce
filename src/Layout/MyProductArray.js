import { deleteDoc, doc } from "firebase/firestore"
import { colRef, storage } from "../App"
import { useState } from "react"
import { deleteObject, getMetadata, ref } from "firebase/storage"

export const MyProductArray = ({data})=>{

    const [warn, setWarn] = useState(false)
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
        <div>

             <img src={data.productImage} alt="image"/>
             <h3>{data.product}</h3>
             <p>company: {data.productOwner}</p>
             <p>category: {data.category}</p>
             <p>price: {data.prize}</p>

             <button className="btn btn-danger" onClick={()=>setWarn(true)}>delete</button>
             {warn && <div>are you sure to delete <button className="btn btn-danger" onClick={handleDelete}>yes</button> <button className="btn btn-outline-warn" onClick={()=>setWarn(false)}>no</button></div>}

        </div>
    )
}