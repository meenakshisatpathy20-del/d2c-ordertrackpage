const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    phone: {
      type: String,
      required: true,
      index: true,
    },

    customer: {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
      },
      phone: {
        type: String,
      },
    },

    items: [
      {
        productId: String,
        name: {
          type: String,
          required: true,
        },
        image: String,
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],

    deliveryAddress: {
      name: String,
      addressLine: String,
      city: String,
      state: String,
      pincode: String,
    },

    payment: {
      method: {
        type: String,
        enum: ["COD", "UPI", "CARD", "NET_BANKING", "WALLET"],
        default: "COD",
      },

      status: {
        type: String,
        enum: ["PAID", "UNPAID", "REFUNDED"],
        default: "UNPAID",
      },

      transactionId: String,
    },

    priceBreakup: {
      itemTotal: {
        type: Number,
        default: 0,
      },
      discount: {
        type: Number,
        default: 0,
      },
      deliveryCharges: {
        type: Number,
        default: 0,
      },
      platformFee: {
        type: Number,
        default: 0,
      },
      totalAmount: {
        type: Number,
        required: true,
      },
    },

    delivery: {
      status: {
        type: String,
        enum: [
          "ORDER_PLACED",
          "PACKED",
          "SHIPPED",
          "OUT_FOR_DELIVERY",
          "DELIVERED",
          "CANCELLED",
        ],
        default: "ORDER_PLACED",
      },

      expectedDate: Date,

      deliveredDate: Date,

      deliveryPartner: String,

      trackingNumber: String,
    },

    trackingHistory: [
      {
        status: String,
        title: String,
        description: String,
        location: String,
        timestamp: {
          type: Date,
          default: Date.now,
        },
        completed: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);