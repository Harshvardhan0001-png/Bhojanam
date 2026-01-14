import React, { useContext } from 'react'
import './Navbar.css'
import {useState} from 'react'
 import { assets } from './../assets/assets.js'
 import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from '../context/StoreContext.jsx';
 
const Navbar = ({setShowLogin}) => {
    const [menu,setMenu] = useState("Home");
    const {getTotalcost,token,setToken} = useContext(StoreContext);
    const navigate = useNavigate();
    const logout =()=>{
        localStorage.removeItem("token");
        setToken("");
        navigate("/")
    }
  return (
    <div className='navbar'>
       <Link to="/"> <div className="logo">Bhoja<span>Nam</span></div></Link>
       <ul className='navbar-menu'>
        <Link to='/' onClick={()=>setMenu("Home")} className={menu==="Home"?"active":""}>Home</Link>
        <a href='#explore-menu' onClick={()=>setMenu("Menu")} className={menu==="Menu"?"active":""}>Menu</a>
        <a href='#appDownload' onClick={()=>setMenu("Mobile-apps")} className={menu==="Mobile-apps"?"active":""}>Mobile-apps</a>
        <a href='#footer' onClick={()=>setMenu("Contact-us")} className={menu==="Contact-us"?"active":""}>Contact-us</a>
       </ul>
       <div className="navbar-right">
        {/* <Link to="/order"><img className="si" src={assets.search_icon} alt="" /></Link> */}
        <div className="navbar-search-icon">
            <Link to="/cart"><img src={assets.basket_icon} alt="" /></Link>
            <div className={getTotalcost()===0?"":"dot"}></div>
        </div>
        
        {!token?<button onClick={()=>setShowLogin(true)}>sign-in</button>:<div className="user-profile">
            <img src={assets.profile_icon} alt="" />
            <ul className='profile-dropDown'>
                <li onClick={()=>navigate("/myorders")}>
                    <img src={assets.bag_icon} alt="" /><p>Orders</p>
                </li>
                <hr />
                <li onClick={logout}>
                    <img  src={assets.logout_icon} alt="" /><p>Logout</p>
                </li>
            </ul>
            </div>}
        
       </div>
    </div>
  )
}

export default Navbar
