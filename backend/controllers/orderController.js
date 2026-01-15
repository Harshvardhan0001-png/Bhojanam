import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import paypal from "@paypal/checkout-server-sdk";
import "dotenv/config";

/* =======================
   PAYPAL CONFIG
======================= */
const environment = new paypal.core.SandboxEnvironment(
  process.env.PAYPAL_CLIENT_ID,
  process.env.PAYPAL_SECRET
);

const paypalClient = new paypal.core.PayPalHttpClient(environment);

/* =======================
   PLACE ORDER
======================= */
const placeOrder = async (req, res) => {
  try {
    // Save order in DB
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
      payment: false,
    });

    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    // PayPal order create
    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");

    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: req.body.amount.toFixed(2),
          },
        },
      ],
      application_context: {
        return_url: `${process.env.BACKEND_URL}/api/order/verify?orderId=${newOrder._id}`,
        cancel_url: `${process.env.BACKEND_URL}/api/order/cancel?orderId=${newOrder._id}`,
      },
    });

    const order = await paypalClient.execute(request);

    const approvalUrl = order.result.links.find(
      (link) => link.rel === "approve"
    );

    if (!approvalUrl) {
      return res.status(500).json({ success: false });
    }

    res.json({
      success: true,
      approval_url: approvalUrl.href,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false });
  }
};

/* =======================
   VERIFY PAYMENT (PAYPAL CALLBACK)
======================= */
const verifyOrder = async (req, res) => {
  const { token, orderId } = req.query;

  try {
    // Capture PayPal payment
    const request = new paypal.orders.OrdersCaptureRequest(token);
    request.requestBody({});
    await paypalClient.execute(request);

    await orderModel.findByIdAndUpdate(orderId, { payment: true });

    res.redirect(`${process.env.FRONTEND_URL}/order-success`);
  } catch (error) {
    console.log(error);
    res.redirect(`${process.env.FRONTEND_URL}/order-failed`);
  }
};

/* =======================
   CANCEL PAYMENT
======================= */
const cancelOrder = async (req, res) => {
  const { orderId } = req.query;

  await orderModel.findByIdAndDelete(orderId);
  res.redirect(`${process.env.FRONTEND_URL}/cart`);
};

/* =======================
   USER ORDERS
======================= */
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    res.json({ success: false });
  }
};

/* =======================
   ADMIN: LIST ORDERS
======================= */
const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, data: orders });
  } catch (error) {
    res.json({ success: false });
  }
};

/* =======================
   ADMIN: UPDATE STATUS
======================= */
const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, {
      status: req.body.status,
    });
    res.json({ success: true });
  } catch (error) {
    res.json({ success: false });
  }
};

export {
  placeOrder,
  verifyOrder,
  cancelOrder,
  userOrders,
  listOrders,
  updateStatus,
};
