import { useEffect, useState } from "react"
import { colRef, storage } from "../App";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {v4} from 'uuid'
import { addDoc } from "firebase/firestore";

export const UploadProduct = ()=>{
    const [productName, setProductName] = useState('');
    const [disable, setDisable] = useState(false)
    const [category, setCategory] = useState('');
    const [imageUpload, setImageUpload] = useState('');
    const [productOwner, setProductOwner] = useState('');
    const [prize, setPrize] = useState('');
    const [stock, setStock] = useState('')
 

    useEffect(() => {
        const displayName = JSON.parse(localStorage.getItem('displayName'));
        if (displayName) {
          setProductOwner(displayName);
        }
      }, []);
    
      const handleProduct = async (e) => {
        if(prize == '' || productOwner === '' || imageUpload === '' || stock ==='' || productName === ''){
          return
        }
        setDisable(true)
        e.preventDefault();
        const imagePath = `images/${imageUpload.name + v4()}`;
        const imageRef = ref(storage, imagePath);
    
        try {
          const snapshot = await uploadBytes(imageRef, imageUpload);
          const url = await getDownloadURL(snapshot.ref);
    
          await addDoc(colRef, {
            product: productName,
            productImage: url,
            category: category,
            productOwner: productOwner,
            prize: prize + '$',
            imagePath: imagePath
          });
          setProductName('');
          setCategory('');
          setPrize('');
          setProductOwner('');
          
          window.location.href = '/';
        } catch (error) {
          console.log(error);
          
        }
        setDisable(false)
      };

    return(
        <section>
            <div className="container-fluid">
            <form>
                <input type="file" accept="image/*" onChange={e => {const file = e.target.files[0];
                 if(file.size > 5 * 1024 * 1024){
                    alert('file size is than 5mb limit');
                    e.target.value = null;
                 }else{
                    setImageUpload(file)
                 }
                }} required />
                <input value={stock} onChange={e => setStock(e.target.value)} placeholder="how many available" required/>
                <input value={productName} onChange={e => setProductName(e.target.value)} placeholder="product name" required/>
                <input value={prize} type="number" placeholder="price in dollars" onChange={(e)=>setPrize(e.target.value)} required />
                <label htmlFor='category'>category</label>
                <select name = 'category' value={category} onChange={e => setCategory(e.target.value)} required >
                    <option  disabled >select category</option>
                    <option value={'clothing'}>clothing</option>
                    <option value={'shoes'}>shoes</option>
                    <option value={'bags'}>bags</option>
                    <option value={'accessories'}>accessories</option>
                </select>

                <button className="btn btn-success" onClick={handleProduct} disabled={disable}>submit</button>
                
            </form>
            </div>
        </section>
    )
}