const express = require("express");
const Order = require("../models/Order");

const router = express.Router();

/*
  GET ORDER BY ORDER ID + PHONE NUMBER

  Example:
  GET /api/orders/ORD1001?phone=9876543210
*/
router.get("/:orderId", async (req, res) => {
  try {
    const { orderId } = req.params;
    const { phone } = req.query;

    if (!phone) {
      return res.status(400).json({
        success: false,
        message: "Phone number is required",
      });
    }

    const order = await Order.findOne({
      orderId: orderId,
      phone: phone,
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found. Please check your Order ID and phone number.",
      });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Order fetch error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while fetching order",
    });
  }
});


/*
  GET ALL ORDERS
  Useful for testing/admin purposes.
*/
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error("Orders fetch error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while fetching orders",
    });
  }
});


/*
  CREATE ORDER
  We'll use this to add sample/test orders
  and later connect it to a real order system.
*/
router.post("/", async (req, res) => {
  try {
    const order = new Order(req.body);

    const savedOrder = await order.save();

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order: savedOrder,
    });
  } catch (error) {
    console.error("Order creation error:", error);

    res.status(400).json({
      success: false,
      message: "Could not create order",
      error: error.message,
    });
  }
});


module.exports = router;