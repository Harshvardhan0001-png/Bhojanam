import React, { useContext, useState } from "react";

import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from 'axios'

const LoginPopup = ({ setShowLogin }) => {
    const {url,setToken} = useContext(StoreContext)
  const [currState, setCurrState] = useState("Login");
  const [data,setData] = useState({
    name:"",
    email:"",
    password:""
  })
  const onChangeHandler = async (event)=>{
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))

  }
  const onLogin = async (event)=>{
     event.preventDefault();
     let newUrl = url;
     if(currState==="Login"){
        newUrl += "/api/user/login"
     }else{
        newUrl += "/api/user/register"
     }
     const response = await axios.post(newUrl,data);
     if(response.data.success){
        setToken(response.data.token);
        localStorage.setItem("token",response.data.token);
        setShowLogin(false)
     }
     else{
        alert(response.data.message);
     }
  }

//   useEffect(()=>{
//   console.log(data)
//   },[data])


  return (
    <div className="loginPage-Container">
      <div className="loginPage">
        <div className="loginPage-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <form onSubmit={onLogin} className="signin-form">
          {currState === "Login" ? (
            <></>
          ) : (
            <input type="text" name="name" onChange={onChangeHandler} value={data.name} placeholder="Your name" required />
          )}
          <input
            type="text"
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            placeholder="Email or phone"
            required
            contentEditable="true"
          />
          <div className="password-field">
            <input
              type="text"
              name="password"
              onChange={onChangeHandler}
              value={data.password}
              placeholder="Password"
              required
              contentEditable="true"
            />
            {currState==="Login"?<p className="forgot-Password">
              <a href="#">forgot password?</a>
            </p>:<></>}
           
          </div>
          <button type='submit'>
            {currState === "Sign Up" ? "Create account" : "Login"}
          </button>
          {/* <div className="login-condition">
            <input type="checkbox" required />
            <p className="p">By continuing, i am agree with terms & privacy policy</p>
          </div> */}
          {currState==="Login"?<p className="p">Create an account. <span className="Signup-Login" onClick={()=>setCurrState("Sign Up")}>Click here</span></p>:
             <p className="p">Already have an account? <span className="Signup-Login" onClick={()=>setCurrState("Login")}>Login here</span></p>
          }

        </form>
       
      </div>
    </div>
  );
};

export default LoginPopup;
