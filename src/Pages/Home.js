import { AuthConsumer } from '../Context/ContextAuth/AuthConsumer';
import{MyProduct} from '../Layout/MyProduct'
import { Admin } from "./Admin";

export const Home = ()=>{
  const {user} = AuthConsumer();
    return(
        <>
        <div className="container-fluid">
          {user && user.uid === process.env.REACT_APP_acceptedID?<Admin name={user.displayName}/>:<div>shop with us</div>}
           
            <main>
              <MyProduct/>
            </main>
        </div>
        </>
    )
}