const mongoose = require("mongoose");
require("dotenv").config();

const Order = require("../models/Order");

const orderData = {
  orderId: "ORD-20260808001",
  phone: "9876543210",

  customer: {
    name: "Aarav Sharma",
    email: "aarav@example.com",
    phone: "9876543210",
  },

  items: [
    {
      productId: "PROD001",
      name: "Men Solid Cotton Oversized T-Shirt",
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
      quantity: 2,
      price: 799,
    },
    {
      productId: "PROD002",
      name: "Slim Fit Casual Jeans",
      image:
        "https://images.unsplash.com/photo-1542272604-787c3835535d",
      quantity: 1,
      price: 1499,
    },
  ],

  deliveryAddress: {
    name: "Aarav Sharma",
    addressLine: "24, Green Park Extension",
    city: "New Delhi",
    state: "Delhi",
    pincode: "110016",
  },

  payment: {
    method: "UPI",
    status: "PAID",
    transactionId: "TXN982734651",
  },

  priceBreakup: {
    itemTotal: 3097,
    discount: 500,
    deliveryCharges: 0,
    platformFee: 29,
    totalAmount: 2626,
  },

  delivery: {
    status: "OUT_FOR_DELIVERY",
    expectedDate: new Date("2026-08-10"),
    deliveryPartner: "Delhivery",
    trackingNumber: "DLV983746251",
  },

  trackingHistory: [
    {
      status: "ORDER_PLACED",
      title: "Order Placed",
      description: "Your order has been placed successfully.",
      location: "New Delhi",
      timestamp: new Date("2026-08-07T10:30:00"),
      completed: true,
    },
    {
      status: "PACKED",
      title: "Packed",
      description: "Your items have been packed.",
      location: "Delhi Warehouse",
      timestamp: new Date("2026-08-07T18:00:00"),
      completed: true,
    },
    {
      status: "SHIPPED",
      title: "Shipped",
      description: "Your package has left the warehouse.",
      location: "Delhi Hub",
      timestamp: new Date("2026-08-08T09:15:00"),
      completed: true,
    },
    {
      status: "OUT_FOR_DELIVERY",
      title: "Out for Delivery",
      description: "Your order is out for delivery.",
      location: "New Delhi",
      timestamp: new Date("2026-08-09T08:30:00"),
      completed: true,
    },
    {
      status: "DELIVERED",
      title: "Delivered",
      description: "Your order will be delivered.",
      location: "New Delhi",
      completed: false,
    },
  ],
};

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    await Order.deleteMany({});

    await Order.create(orderData);

    console.log("✅ Order inserted successfully");

    process.exit(0);
  } catch (error) {
    console.error("❌ Seed error:", error.message);
    process.exit(1);
  }
};

seedDatabase();