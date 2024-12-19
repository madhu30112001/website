import React, { useContext, useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { StoreContext } from '../context/Contextapi';
import axios from 'axios';

const MyOrder = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const response = await axios.post(`${url}/api/order/userorders`, {}, { headers: { token } });
      setData(response.data.data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      {loading ? (
        <div>Loading...</div> // Show loading indicator while fetching data
      ) : (
        <div className="container">
          {data.length > 0 ? (
            data.map((order, index) => (
              <div key={index} className="my-orders-order">
                <img src={assets.parcel_icon} alt="Parcel Icon" />
                <p>
                  {order.items
                    .map((item) => `${item.name} x ${item.quantity}`)
                    .join(', ')}
                </p>
                <p>${order.amount}.00</p>
                <p>Items: {order.items.length}</p>
                <p>
                  <span>&#x25cf;</span>
                  <b>{order.status}</b>
                </p>
                {/* You might want to add functionality for the "Track Order" button */}
                <button onClick={fetchOrders}>Track Order</button>
              </div>
            ))
          ) : (
            <div>No orders found</div> // Display message when no orders are present
          )}
        </div>
      )}
    </div>
  );
};

export default MyOrder;
