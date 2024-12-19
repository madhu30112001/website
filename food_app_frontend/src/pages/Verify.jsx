import React, { useContext, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StoreContext } from '../context/Contextapi';
import axios from 'axios';

const Verify = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get('success');
  const orderId = searchParams.get('orderId');
  const paymentId = searchParams.get('paymentId'); // Retrieve paymentId from query params
  const payerId = searchParams.get('PayerID'); // Retrieve PayerID from query params
  const { url } = useContext(StoreContext);
  const navigate = useNavigate();

  const verifyPayment = async () => {
    try {
      // Make the request with the necessary parameters
      const response = await axios.post(`${url}/api/order/verify`, {
        success,
        orderId,
        paymentId,  // Pass the paymentId
        payerId,     // Pass the PayerID
      });

      if (response.data.success) {
        navigate('/myorders'); // Redirect to My Orders page on success
      } else {
        navigate('/'); // Redirect to home page on failure
      }
    } catch (error) {
      console.error('Payment verification failed:', error);
      navigate('/'); // Redirect to home page in case of error
    }
  };

  useEffect(() => {
    if (success && orderId) {
      verifyPayment(); // Call the verify function on load
    } else {
      navigate('/'); // If no success or orderId, redirect to home
    }
  }, [success, orderId, navigate]);

  return (
    <div className='verify'>
      <div className="spinner"></div>
      <p>Verifying payment, please wait...</p>
    </div>
  );
};

export default Verify;
