import { deleteDoc, doc } from "firebase/firestore"
import { colRef, storage } from "../App"
import { useState } from "react"
import { deleteObject, getMetadata, ref } from "firebase/storage"
import { AuthConsumer } from "../Context/ContextAuth/AuthConsumer"
import { Link } from "react-router-dom"

export const MyProductArray = ({data})=>{

    const [warn, setWarn] = useState(false);
    const {user} = AuthConsumer();
    const handleDelete =  ()=>{
                const fileStorage = ref(storage, data.imagePath);
                if(fileStorage){
                    console.log('wey')
                    const metaData = getMetadata(fileStorage).then(()=>{
                        deleteObject(fileStorage);
                    }).catch(error=>{
                        if(error){
                            const docRef = doc(colRef, data.id);
                            deleteDoc(docRef);
                        }
                        console.log(error);
                        return
                    })
                const docRef = doc(colRef, data.id);
                deleteDoc(docRef);
                    }
                    const docRef = doc(colRef, data.id);
                    deleteDoc(docRef);
                }
                
            

    return(
        <Link to={`/commerce/${data.id}`} className="product">
            <div className="productImage">
             <img src={data.productImage} alt="image"/>
            </div>
             <div className="productDetail">
                <div>{data.product}</div>
                <div>price: {data.prize}</div>
                
                <div>
                    <button className="full-btn">Add to cart</button>
                </div>

                {user && user.uid === process.env.REACT_APP_acceptedID && <button className="outline-btn" onClick={()=>setWarn(true)}>delete</button>}
                { user && warn && <div> <div>are you sure to delete</div> <button className="outline-btn" onClick={handleDelete}>yes</button> <button className="full-btn" onClick={()=>setWarn(false)}>no</button></div>}
            
             </div>

        </Link>
    )
}