import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  orderPlace,
  selectCartItems,
  selectFoodList,
  selectToken,
  selectTotalCartAmount,
} from "../redux/slice/globalSlice";
import { url } from "../utils/helper";

const PlaceOrder = () => {
  const dispatch = useDispatch();
  const totalAmount = useSelector(selectTotalCartAmount);

  const token = useSelector(selectToken);
  const foodList = useSelector(selectFoodList);
  const cartItems = useSelector(selectCartItems);
  const loading = useSelector((state) => state.global.loading);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  // Event handler for form input changes
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (!loading && (!token || totalAmount === 0)) {
      navigate("/cart");
    }
  }, [token, totalAmount, navigate, loading]);

  const placeOrder = async (event) => {
    event.preventDefault();
    const orderItems = foodList
      .filter((item) => item?._id && cartItems[item._id] > 0)
      .map((item) => ({
        ...item,
        quantity: cartItems[item._id],
      }));

    const orderData = {
      address: data,
      items: orderItems,
      amount: (totalAmount + 1).toFixed(2),
      currency: "USD",
    };

    const resultAction = await dispatch(orderPlace(orderData));

    if (orderPlace.fulfilled.match(resultAction)) {
      window.location.replace(resultAction.payload.session_url);
    } else {
      alert(resultAction.payload || "Something went wrong.");
    }
  };

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            name="firstName"
            onChange={onChangeHandler}
            value={data.firstName}
            type="text"
            placeholder="First Name"
            required
          />
          <input
            name="lastName"
            onChange={onChangeHandler}
            value={data.lastName}
            type="text"
            placeholder="Last Name"
            required
          />
        </div>
        <input
          name="email"
          onChange={onChangeHandler}
          value={data.email}
          type="email"
          placeholder="Email Address"
          required
        />
        <input
          name="street"
          onChange={onChangeHandler}
          value={data.street}
          type="text"
          placeholder="Street"
          required
        />
        <div className="multi-fields">
          <input
            name="city"
            onChange={onChangeHandler}
            value={data.city}
            type="text"
            placeholder="City"
            required
          />
          <input
            name="state"
            onChange={onChangeHandler}
            value={data.state}
            type="text"
            placeholder="State"
            required
          />
        </div>
        <div className="multi-fields">
          <input
            name="zipcode"
            onChange={onChangeHandler}
            value={data.zipcode}
            type="text"
            placeholder="Zip Code"
            required
          />
          <input
            name="country"
            onChange={onChangeHandler}
            value={data.country}
            type="text"
            placeholder="Country"
            required
          />
        </div>
        <input
          name="phone"
          onChange={onChangeHandler}
          value={data.phone}
          type="text"
          placeholder="Phone"
          required
        />
      </div>
      <div className="place-order-right">
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
              <p>$1</p>
            </div>
            <hr />
            <div className="cart-total-detail">
              <b>Total</b>
              <p>${totalAmount + 1}</p>
            </div>
          </div>
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
