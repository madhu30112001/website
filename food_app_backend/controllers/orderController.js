import orderModel from "./../models/orderModel.js";
import userModel from "./../models/userModel.js";
import paypal from "paypal-rest-sdk";
import dotenv from "dotenv";

dotenv.config();

paypal.configure({
  mode: "sandbox", 
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_CLIENT_SECRET,
});
const frontend_url = "http://localhost:5173";


const placeOrder = async (req, res) => {
  try {
    const { userId, address, items, amount, currency } = req.body;
    if (!address || !items || !amount || !currency) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }
    console.log("Amount from request:", amount);
    console.log(typeof amount);

    const newOrder = new orderModel({
      userId, // Assuming userId is extracted from token
      address,
      items,
      amount,
    });

    await newOrder.save();
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    const orderItems = items.map((item) => ({
      name: item.name,
      price: parseFloat(item.price).toFixed(2), // Format to two decimals
      currency: currency,
      quantity: item.quantity,
    }));
    console.log("Order Items:", orderItems);

    orderItems.push({
      name: "Delivery Charges",
      price: "1.00", 
      currency: currency,
      quantity: 1,
    });
    const calculatedTotal = orderItems.reduce(
      (total, item) => total + parseFloat(item.price) * item.quantity,
      0
    );
    if (parseFloat(amount) !== calculatedTotal) {
      return res.status(400).json({
        success: false,
        message: "Order total mismatch. Please try again.",
      });
    }
    const create_payment_json = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
        cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
      },
      transactions: [
        {
          item_list: {
            items: orderItems,
          },
          amount: {
            currency: currency,
            total: amount, 
          },
          description: "Payment for your order.",
        },
      ],
    };

    paypal.payment.create(create_payment_json, (error, payment) => {
      if (error) {
        console.error("PayPal Payment Creation Error:", error);
        return res.json({ success: false, message: "Error creating payment" });
      }
      const approvalUrl = payment.links.find(
        (link) => link.rel === "approval_url"
      ).href;
      res.json({ success: true, session_url: approvalUrl });
    });
  } catch (error) {
    console.error("Error in placeOrder:", error);
    res.json({ success: false, message: "Error placing order" });
  }
};

// Verify Payment
const verifyOrder = async (req, res) => {
  const { orderId, success, paymentId, payerId } = req.body;
  try {
    if (success === "true") {
      const execute_payment_json = {
        payer_id: payerId,
      };

      paypal.payment.execute(
        paymentId,
        execute_payment_json,
        async (error, payment) => {
          if (error) {
            console.error(error.response);
            return res.json({
              success: false,
              message: "Payment verification failed",
            });
          }
          console.log("PayPal Payment Details:", payment);

          const updatedOrder = await orderModel.findByIdAndUpdate(
            orderId,
            { payment: true },
            { new: true }
          );
          if (!updatedOrder) {
            return res
              .status(404)
              .json({ success: false, message: "Order not found" });
          }
          res.json({ success: true, message: "Payment verified successfully" });
        }
      );
    } else {
      const deletedOrder = await orderModel.findByIdAndDelete(orderId);
      if (!deletedOrder) {
        return res
          .status(404)
          .json({ success: false, message: "Order not found for deletion" });
      }
      res.json({
        success: false,
        message: "Payment not completed, order canceled",
      });
    }
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error verifying payment" });
  }
};

// Other APIs
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error fetching orders" });
  }
};

const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, data: orders });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error fetching orders" });
  }
};

const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, {
      status: req.body.status,
    });
    res.json({ success: true, message: "Status updated" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error updating status" });
  }
};

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };
