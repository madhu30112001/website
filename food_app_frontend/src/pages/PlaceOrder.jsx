import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../context/Contextapi";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
    const { getTotalCartAmount, token, food_list, cartItems, url } =
        useContext(StoreContext);
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
        if (!token || getTotalCartAmount() === 0) {
            navigate("/cart");
        }
    }, [token]);

    const placeOrder = async (event) => {
        event.preventDefault();
        const orderItems = food_list
            .filter((item) => cartItems[item._id] > 0)
            .map((item) => ({
                ...item,
                quantity: cartItems[item._id],
            }));

        const orderData = {
            address: data,
            items: orderItems,
            amount: (getTotalCartAmount()+1).toFixed(2), // Ensure two decimal places
            currency: "USD", // Ensure this matches the backend

        };

         
        try {
            const response = await axios.post(`${url}/api/order/place`, orderData, { headers: { token } });
            if (response.data.success) {
                window.location.replace(response.data.session_url);
            } else {
                alert("Error placing order. Please try again.");
            }
        } catch (error) {
            console.error("Error placing order:", error);
        }
    };


    return (
        <form onSubmit={placeOrder} className="place-order">
            <div className="place-order-left">
                <p className="title">Delivery Information</p>
                <div className="multi-fields">
                    <input name="firstName" onChange={onChangeHandler} value={data.firstName} type="text" placeholder="First Name" required />
                    <input name="lastName" onChange={onChangeHandler} value={data.lastName} type="text" placeholder="Last Name" required />
                </div>
                <input name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder="Email Address" required />
                <input name="street" onChange={onChangeHandler} value={data.street} type="text" placeholder="Street" required />
                <div className="multi-fields">
                    <input name="city" onChange={onChangeHandler} value={data.city} type="text" placeholder="City" required />
                    <input name="state" onChange={onChangeHandler} value={data.state} type="text" placeholder="State" required />
                </div>
                <div className="multi-fields">
                    <input name="zipcode" onChange={onChangeHandler} value={data.zipcode} type="text" placeholder="Zip Code" required />
                    <input name="country" onChange={onChangeHandler} value={data.country} type="text" placeholder="Country" required />
                </div>
                <input name="phone" onChange={onChangeHandler} value={data.phone} type="text" placeholder="Phone" required />
            </div>
            <div className="place-order-right">
                <div className="cart-total">
                    <h2>Cart Total</h2>
                    <div>
                        <div className="cart-total-detail">
                            <p>Subtotal</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cart-total-detail">
                            <p>Delivery Fee</p>
                            <p>$1</p>
                        </div>
                        <hr />
                        <div className="cart-total-detail">
                            <b>Total</b>
                            <p>${getTotalCartAmount()+1}</p>
                        </div>
                    </div>
                    <button type="submit">PROCEED TO PAYMENT</button>
                </div>
            </div>
        </form>
    );
};

export default PlaceOrder;
