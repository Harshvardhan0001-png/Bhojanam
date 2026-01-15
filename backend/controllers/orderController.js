import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import paypal from "@paypal/checkout-server-sdk"; // i have commented this
import "dotenv/config";

// Configure PayPal client
const environment = new paypal.core.SandboxEnvironment(
  process.env.PAYPAL_CLIENT_ID,
  process.env.PAYPAL_SECRET
);

const paypalClient = new paypal.core.PayPalHttpClient(environment);

// Placing user order from the frontend
const placeOrder = async (req, res) => {
    // frontend_url
  console.log(req.body,"inplaceorder ordercontroller");
  try {
    // Create a new order in the database
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
      
    });
    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    // Prepare PayPal purchase units
    const purchase_units = [
      {
        amount: {
          currency_code: "USD",
          value: req.body.amount, // Total amount
          breakdown: {
            item_total: {
              currency_code: "USD",
              value: req.body.items.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0
              ),
            },
            shipping: {
              currency_code: "USD",
              value: "4.00", // Delivery charges
            },
          },
        },
        items: req.body.items.map((item) => ({
          name: item.name,
          quantity: item.quantity.toString(),
          unit_amount: {
            currency_code: "USD",
            value: item.price,
          },
        })),
      },
    ];
    console.log(purchase_units,"hi i am purchase units");////

    // Create a PayPal order request
    const request = new paypal.orders.OrdersCreateRequest();
    request.body = {
      intent: "CAPTURE",
      purchase_units:purchase_units, // This should contain your purchase data, such as amount and items
      application_context: {
        return_url: `${process.env.FRONTEND_URL}/verify?success=true&orderId=${newOrder._id}`,
        cancel_url: `${process.env.FRONTEND_URL}/verify?success=false&orderId=${newOrder._id}`,
      },
    };

    const order = await paypalClient.execute(request);
    console.log(JSON.stringify(order, null, 2));

    const approvalUrl = order.result.links.find(
      (link) => link.rel === "approve"
    );
    console.log(approvalUrl);

    if (approvalUrl) {
      res.json({
        success: true,
        approval_url: approvalUrl.href,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Approval URL not found in PayPal response",
      });
    }
  } catch (error) {
    console.log(error,"yu");
    res.json({ success: false, message: "error" });
  }
};

// Temporary verification method for orders (using PayPal capture API)


const verifyOrder = async (req, res) => {
    
      const { orderId, success } = req.body;
      try {
        if(success==="true"){
            await orderModel.findByIdAndUpdate(orderId,{payment:true});
            res.json({success:true,message:"Paid"})
        }else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({success:false,message:"Not Paid"})
        }
      } catch (error) {
        console.log(error);
        res.json({success:false,message:"error"})
      }

}



// Fetch user orders for the frontend
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.json({ success: false, message: "Error fetching orders" });
  }
};

// List all orders (admin function)
const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log("Error fetching all orders:", error);
    res.json({ success: false, message: "Error" });
  }
};

// Update order status (admin function)
const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, {
      status: req.body.status,
    });
    res.json({ success: true, status: "Status Updated" });
  } catch (error) {
    console.log("Error updating status:", error);
    res.json({ success: false, message: "Error" });
  }
};

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };


