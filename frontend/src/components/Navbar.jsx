import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from './../assets/assets.js'
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from '../context/StoreContext.jsx';

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("Home");
  const [open, setOpen] = useState(false);
  const { getTotalcost, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  return (
    <div className='navbar'>
      <Link to="/" className="logo">
        Bhoja<span>Nam</span>
      </Link>

      {/* 🍔 HAMBURGER */}
      <div className="hamburger" onClick={() => setOpen(!open)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* MENU */}
      <ul className={`navbar-menu ${open ? "show" : ""}`}>
        <Link to='/' onClick={() => { setMenu("Home"); setOpen(false); }}
          className={menu === "Home" ? "active" : ""}>Home</Link>

        <a href='#explore-menu' onClick={() => { setMenu("Menu"); setOpen(false); }}
          className={menu === "Menu" ? "active" : ""}>Menu</a>

        <a href='#appDownload' onClick={() => { setMenu("Mobile-apps"); setOpen(false); }}
          className={menu === "Mobile-apps" ? "active" : ""}>Mobile-apps</a>

        <a href='#footer' onClick={() => { setMenu("Contact-us"); setOpen(false); }}
          className={menu === "Contact-us" ? "active" : ""}>Contact-us</a>
      </ul>

      {/* RIGHT */}
      <div className="navbar-right">
        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="" />
          </Link>
          <div className={getTotalcost() === 0 ? "" : "dot"}></div>
        </div>

        {!token ? (
          <button onClick={() => setShowLogin(true)}>sign-in</button>
        ) : (
          <div className="user-profile">
            <img src={assets.profile_icon} alt="" />
            <ul className='profile-dropDown'>
              <li onClick={() => navigate("/myorders")}>
                <img src={assets.bag_icon} alt="" />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
