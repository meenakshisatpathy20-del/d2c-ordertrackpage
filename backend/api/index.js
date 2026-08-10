import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

let isConnected = false;

async function connectDB() {
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}

// TEST ROUTE
app.get("/", async (req, res) => {
  res.json({
    success: true,
    message: "Order Tracking Backend is running",
  });
});

// ORDER TRACKING ROUTE
app.get("/api/orders/:orderId", async (req, res) => {
  try {
    await connectDB();

    const { orderId } = req.params;
    const { phone } = req.query;

    if (!orderId || !phone) {
      return res.status(400).json({
        success: false,
        message: "Order ID and phone number are required",
      });
    }

    // IMPORTANT:
    // Replace this with your actual Order model/query
    const Order = mongoose.model(
      "Order",
      new mongoose.Schema(
        {
          orderId: String,
          customer: String,
          phone: String,
          status: String,
          items: Array,
        },
        { collection: "orders" }
      )
    );

    const order = await Order.findOne({
      orderId: orderId,
      phone: phone,
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Order tracking error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});

export default app;