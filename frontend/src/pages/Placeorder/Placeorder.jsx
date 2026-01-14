import React, { useContext, useState,useEffect } from "react";
import "./Placeorder.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const Placeorder = () => {
  const navigate = useNavigate();
  const { getTotalcost, token, url, food_list, cartItems } =
    useContext(StoreContext);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const proceedToPay = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });
     console.log(orderItems);
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalcost() + 4,
    };
   
    try {
      let response = await axios.post(url + "/api/order/place", orderData, {
        headers: { token },
      });

      if (response.data.success) {
        console.log(response.data)
        const { approval_url } = response.data;
        window.location.replace(approval_url);  // uncomment it after adding the paypal method
      } else {
        alert("Error creating PayPal order");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };
  useEffect(()=>{
      if(!token){
       navigate('/cart') 
      }else if(getTotalcost()===0){
        navigate('/cart')  
      }
  },[token])

  return (
    //onSubmit={proceedToPay} place it in form.
    <form onSubmit={proceedToPay} className="Place-Order">
      <div className="Place-Order-left">
        <h2 className="title">Delivery Information</h2>
        <div className="multi-fields">
          <input
            required
            name="firstName"
            onChange={onChangeHandler}
            value={data.firstName}
            type="text"
            placeholder="First name"
          />
          <input
            required
            name="lastName"
            onChange={onChangeHandler}
            value={data.lastName}
            type="text"
            placeholder="Second name"
          />
        </div>
        <input
          required
          name="email"
          onChange={onChangeHandler}
          value={data.email}
          type="text"
          placeholder="Email Address"
        />
        <input
          required
          name="country"
          onChange={onChangeHandler}
          value={data.country}
          type="text"
          placeholder="Country"
        />
        <div className="multi-fields">
          <input
            required
            name="state"
            onChange={onChangeHandler}
            value={data.state}
            type="text"
            placeholder="State"
          />
          <input
            required
            name="city"
            onChange={onChangeHandler}
            value={data.city}
            type="text"
            placeholder="City"
          />
        </div>
        <div className="multi-fields">
          <input
            required
            name="pincode"
            onChange={onChangeHandler}
            value={data.pincode}
            type="text"
            placeholder="Pin Code"
          />
          <input
            required
            name="street"
            onChange={onChangeHandler}
            value={data.street}
            type="text"
            placeholder="Street"
          />
        </div>
        <input
          required
          name="phone"
          onChange={onChangeHandler}
          value={data.phone}
          type="text"
          placeholder="Phone No."
        />
      </div>
      <div className="Place-Order-right">
        <div className="cart-total">
          <h2>Cart-Summary</h2>
          <div className="cart-total-details">
            <p>Item Total</p>
            <p>$ {getTotalcost()}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>$ {2}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Plateform Fee</p>
            <p>$ {2}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <b>Total Cost</b>
            <b>$ {getTotalcost() === 0 ? 0 : 4 + getTotalcost()}</b>
          </div>
          <button type="submit" >PROCEED TO PAY</button>
        </div>
      </div>
    </form>
  );
};

export default Placeorder;
