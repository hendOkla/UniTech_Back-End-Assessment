import React , {useEffect , useState} from "react"
import {Link, useLocation } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faPlusCircle  } from '@fortawesome/free-solid-svg-icons';


const Header =()=>{
    const [activeTab, setActiveTab] = useState("home");
    const location = useLocation();
    



    useEffect(()=>{
        if(location.pathname === '/'){
            setActiveTab("Home")
        }else if(location.pathname === "/add"){
            setActiveTab("AddUser")
        }
    },[])
    return(
        <nav className="navbar navbar-dark bg-dark">
            <a class="navbar-brand my-2 m-3">Product Management System</a>
            <form class="form-inline">
                <Link to="/">
                <p className="btn btn-warning my-2 m-3 head-color" onClick={()=>setActiveTab("home")}><FontAwesomeIcon icon={faHome} />Home</p>
                </Link>
                <Link to="/add">
                <p className="btn btn-success my-2 m-3" onClick={()=>setActiveTab("AddProduct")}>
                    <FontAwesomeIcon icon={faPlusCircle} />
                    Add Product
                </p>
                </Link>
            </form>
        </nav>
    )
}

export default Header