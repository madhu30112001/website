import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCartItems,
  selectFoodList,
  selectTotalCartAmount,
  removeFromCart,
  loadCartData,
  fetchFoodList,
  setToken,
} from "../redux/slice/globalSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const foodList = useSelector(selectFoodList);
  const totalAmount = useSelector(selectTotalCartAmount);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchFoodList());
    if (sessionStorage.getItem("token")) {
      dispatch(setToken(sessionStorage.getItem("token")));
      dispatch(loadCartData());
    }
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Navigating to order...");
    navigate("/order");
  };

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {foodList.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={index}>
                <div className="cart-items-title cart-items-item">
                  <img
                    src={`http://localhost:4000/images/${item.image}`}
                    alt=""
                  />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>${item.price * cartItems[item._id]}</p>
                  <button
                    onClick={() => dispatch(removeFromCart(item._id))}
                    className="cross"
                  >
                    Delete
                  </button>
                </div>
                <hr />
              </div>
            );
          }
          return null;
        })}
      </div>

      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-detail">
              <p>Subtotal</p>
              <p>${totalAmount}</p>
            </div>
            <hr />
            <div className="cart-total-detail">
              <p>Delivery Fee</p>
              <p>${totalAmount === 0 ? 0 : 1}</p>
            </div>
            <hr />
            <div className="cart-total-detail">
              <b>Total</b>
              <b>${totalAmount === 0 ? 0 : totalAmount + 1}</b>
            </div>
          </div>
          <button onClick={handleSubmit}>PROCEED TO CHECKOUT</button>
        </div>

        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="Promo Code" />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
