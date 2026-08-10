import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());


// ==========================================
// MONGODB
// ==========================================

if (process.env.MONGO_URI) {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("✅ MongoDB Connected");
    })
    .catch((error) => {
      console.error("❌ MongoDB Error:", error.message);
    });
} else {
  console.log("⚠️ MONGO_URI not found in .env");
}


// ==========================================
// HOME
// ==========================================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Order Tracking API is running",
  });
});


// ==========================================
// TRACK ORDER
// ==========================================

app.post("/api/orders/track", (req, res) => {
  try {
    const { orderId, phone } = req.body;

    console.log("=================================");
    console.log("📦 Order ID:", orderId);
    console.log("📱 Phone:", phone);
    console.log("=================================");

    if (!orderId || !phone) {
      return res.status(400).json({
        success: false,
        message: "Order ID and phone number are required.",
      });
    }

    // ==========================================
    // DEMO ORDER
    // ==========================================

    const order = {
      orderId,

      status: "Processing",

      orderDate: "08 August 2026, 10:32 AM",

      estimatedDelivery: "10 August 2026",

      lastUpdated: "10 August 2026, 08:35 AM",

      customer: {
        name: "Meenakshi Satpathy",
        phone,
        email: "meenakshi@example.com",
      },

      shippingAddress: {
        name: "Meenakshi Satpathy",
        line1: "123 Main Street",
        line2: "Near City Centre",
        city: "Bhubaneswar",
        state: "Odisha",
        pincode: "751001",
        country: "India",
      },

      payment: {
        status: "Paid",
        method: "UPI",
        transactionId:
          "TXN-" +
          orderId.replace(/\D/g, "").slice(-8),
      },

      shipment: {
        courier: "Delhivery",
        trackingNumber:
          "DL" +
          orderId.replace(/\D/g, ""),
        currentLocation: "Bhubaneswar, Odisha",
        deliveryType: "Standard Delivery",
      },

      items: [
        {
          name: "Men Solid Cotton Oversized T-Shirt",
          sku: "TS-OVR-BLK-L",
          size: "L",
          color: "Black",
          quantity: 2,
          price: 999,
          image: "👕",
        },

        {
          name: "Slim Fit Casual Jeans",
          sku: "JNS-SLM-BLU-32",
          size: "32",
          color: "Blue",
          quantity: 1,
          price: 1499,
          image: "👖",
        },
      ],

      price: {
        subtotal: 3497,
        discount: 300,
        shipping: 50,
        tax: 180,
        total: 3427,
      },

      tracking: [
        {
          title: "Order Placed",
          description:
            "Your order has been placed successfully.",
          date: "08 August 2026",
          time: "10:32 AM",
          completed: true,
          icon: "✓",
        },

        {
          title: "Payment Confirmed",
          description:
            "Your payment has been successfully received.",
          date: "08 August 2026",
          time: "10:33 AM",
          completed: true,
          icon: "₹",
        },

        {
          title: "Order Processing",
          description:
            "Your order is being prepared for shipment.",
          date: "08 August 2026",
          time: "11:15 AM",
          completed: true,
          current: true,
          icon: "📦",
        },

        {
          title: "Packed",
          description:
            "Your items will be packed and prepared for dispatch.",
          date: "",
          time: "",
          completed: false,
          icon: "📦",
        },

        {
          title: "Shipped",
          description:
            "Your package will be handed over to the delivery partner.",
          date: "",
          time: "",
          completed: false,
          icon: "🚚",
        },

        {
          title: "Out for Delivery",
          description:
            "Your package will be delivered to your address.",
          date: "",
          time: "",
          completed: false,
          icon: "🏠",
        },

        {
          title: "Delivered",
          description:
            "Your order will be delivered successfully.",
          date: "",
          time: "",
          completed: false,
          icon: "✓",
        },
      ],
    };

    return res.status(200).json({
      success: true,
      order,
    });

  } catch (error) {

    console.error("❌ Track Order Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
});


// ==========================================
// START SERVER
// ==========================================

app.listen(PORT, () => {
  console.log(
    `🚀 Server running on http://localhost:${PORT}`
  );
});