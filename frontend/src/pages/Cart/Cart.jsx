import React, { useContext } from "react";
import "./Cart.css";

import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, food_list, removeFromCart,getTotalcost,url} = useContext(StoreContext);
  const navigate = useNavigate();

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p className="cartTable">Items</p>
          <p className="cartTable">Title</p>
          <p className="cartTable">Price</p>
          <p className="cartTable">Quantity</p>
          <p className="cartTable">Total</p>
          <p className="cartTable">Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key ={index} className="cart-details">
                <div className="cart-items-title cart-items-item">
                  <img src={url+"/images/"+item.image} alt="" />
                  <p>{item.name}</p>
                  <p>$ {item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>$ {cartItems[item._id] * item.price}</p>
                  <p
                    onClick={() => removeFromCart(item._id)}
                    className="remove cartTable"
                  >
                    x
                  </p>
                </div>
                <hr />
              </div>
            );
          }
        })}
      </div>
      <div className="cart-bottom">
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
            <b>$ {getTotalcost()===0?0:4+getTotalcost()}.00</b>
           
          </div>
          <button onClick={()=>navigate("/order")}>PROCEED TO CHECKOUT</button>
       
        </div>
        <div className="promocode">
        <div>
            <p>If you have a promocode,Enter it here!!!</p>
            <div className="input-promocode">
                <input type="text" placeholder="Enter Promo code" />
                <button >Submit</button>
            </div>
        </div>
      </div>
      </div>
      
      
    </div>
  );
};

export default Cart;
