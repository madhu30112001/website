import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { assets } from "../assets/assets";
import {
  selectToken,
  selectUserOrders,
  selectOrdersLoading,
  fetchOrders,
} from "../redux/slice/globalSlice";

const MyOrder = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const orders = useSelector(selectUserOrders);
  const loading = useSelector(selectOrdersLoading);

  useEffect(() => {
    if (token) {
      dispatch(fetchOrders());
    }
  }, [token, dispatch]);

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="container">
          {orders.length > 0 ? (
            orders.map((order, index) => (
              <div key={index} className="my-orders-order">
                <img src={assets.parcel_icon} alt="Parcel Icon" />
                <p>
                  {order.items
                    .map((item) => `${item.name} x ${item.quantity}`)
                    .join(", ")}
                </p>
                <p>${order.amount}.00</p>
                <p>Items: {order.items.length}</p>
                <p>
                  <span>&#x25cf;</span>
                  <b>{order.status || "Placed"}</b>
                </p>
                {/* Optional: Replace this with actual tracking logic */}
                <button onClick={() => dispatch(fetchUserOrders())}>
                  Refresh Status
                </button>
              </div>
            ))
          ) : (
            <div>No orders found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default MyOrder;
