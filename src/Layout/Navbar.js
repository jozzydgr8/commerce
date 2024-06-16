import {NavLink} from "react-router-dom";
import { auth } from "../App";
import { signOut } from "firebase/auth";
import { AuthConsumer } from "../Context/ContextAuth/AuthConsumer";
import { UseContextData } from "../Context/ContextAuth/ContextProvider/UseContextData";
export const Navbar = ()=>{
    const {dispatch:deleteData}= UseContextData();
    const {dispatch, user} = AuthConsumer();
    const handleLogOut = ()=>{
        signOut(auth)
        .then(()=>{
            localStorage.removeItem('user');
            localStorage.removeItem('displayName');
            deleteData({type:'getData', payload:null});
            dispatch({type:'signUser', payload:null});
            
        })
    }
    return(
        <nav className="navbar bg-body-tertiary">
  <div className="container-fluid">
    
    <NavLink className="navbar-brand" to="#">Trade</NavLink>


    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>


    <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Menu</h5>
        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div className="offcanvas-body">
        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
          <li className="nav-item">
            <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="#">Link</NavLink>
          </li>
          <li>
          {user ? <button className="outline-btn" onClick={handleLogOut}>logout</button> : <button className="full-btn">sign in</button> }
          </li>
          <li className="nav-item dropdown">
            <NavLink className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Dropdown
            </NavLink>
            <ul className="dropdown-menu">
              <li><NavLink className="dropdown-item" to="#">Action</NavLink></li>
              <li><NavLink className="dropdown-item" to="#">Another action</NavLink></li>
              <li>
                <hr className="dropdown-divider"/>
              </li>
              <li><NavLink className="dropdown-item" to="#">Something else here</NavLink></li>
            </ul>
          </li>
        </ul>
        <form className="d-flex mt-3" role="search">
          <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
          <button className="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
    </div>
  </div>
</nav>
    )
}