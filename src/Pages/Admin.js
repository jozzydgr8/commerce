import { Link } from "react-router-dom";
export const Admin  = ({name})=>{

    return(
        <>
        <div className="container-fluid">
           <h3>welcome {name}</h3>
            <div className="homefeatures">
             <Link to='uploadproduct' className="full-btn">
             click to upload product
             </Link>
            </div>
            
        </div>
        </>
    )
}