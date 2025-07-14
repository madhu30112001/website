import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { verifyPayment } from "../redux/slice/globalSlice";

const Verify = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const paymentId = searchParams.get("paymentId");
  const payerId = searchParams.get("PayerID");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleVerify = async () => {
      const result = await dispatch(
        verifyPayment({ success, orderId, paymentId, payerId })
      );

      if (verifyPayment.fulfilled.match(result)) {
        navigate("/myorders");
      } else {
        navigate("/");
      }
    };

    if (success && orderId) {
      handleVerify();
    } else {
      navigate("/");
    }
  }, [success, orderId, paymentId, payerId, dispatch, navigate]);

  return (
    <div className="verify">
      <div className="spinner"></div>
      <p>Verifying payment, please wait...</p>
    </div>
  );
};

export default Verify;
