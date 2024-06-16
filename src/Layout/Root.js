import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";


export const Root = ()=>{

    return(
    <section className="rootsection">
        <Navbar/>
        <main>        
            <Outlet />
        </main>
    </section>
    )
}