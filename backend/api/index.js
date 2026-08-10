import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());

let isConnected = false;

async function connectDB() {
  if (isConnected && mongoose.connection.readyState === 1) {
    return;
  }

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is missing");
  }

  await mongoose.connect(process.env.MONGO_URI);
  isConnected = true;

  console.log("MongoDB connected");
}

/* =========================
   HEALTH CHECK
========================= */

app.get("/api", (req, res) => {
  res.json({
    success: true,
    message: "Order Tracking API is running",
  });
});

/* =========================
   TRACK ORDER
========================= */

app.post("/api/orders/track", async (req, res) => {
  try {
    const { orderId, phone } = req.body;

    if (!orderId || !phone) {
      return res.status(400).json({
        success: false,
        message: "Order ID and phone number are required.",
      });
    }

    await connectDB();

    const orderSchema = new mongoose.Schema(
      {
        orderId: String,
        phone: String,

        customer: mongoose.Schema.Types.Mixed,

        status: String,

        orderDate: String,
        estimatedDelivery: String,
        lastUpdated: String,

        shippingAddress: mongoose.Schema.Types.Mixed,

        payment: mongoose.Schema.Types.Mixed,

        shipment: mongoose.Schema.Types.Mixed,

        items: Array,

        price: mongoose.Schema.Types.Mixed,

        tracking: Array,
      },
      {
        collection: "orders",
        strict: false,
      }
    );

    const Order =
      mongoose.models.Order ||
      mongoose.model("Order", orderSchema);

    const order = await Order.findOne({
      orderId: orderId.trim(),
      phone: phone.trim(),
    }).lean();

    if (!order) {
      return res.status(404).json({
        success: false,
        message:
          "No order found with this Order ID and phone number.",
      });
    }

    return res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Track order error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to track order.",
      error: error.message,
    });
  }
});

export default app;