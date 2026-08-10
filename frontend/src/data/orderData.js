const orderData = {
  orderId: "ORD-20260808001",
  trackingId: "TRK982736451",
  orderDate: "08 August 2026",

  status: "Out For Delivery",

  expectedDelivery: "Today before 8 PM",

  deliveryPartner: "Delhivery",

  products: [
    {
      id: 1,
      name: "Nike Air Max 270",
      brand: "Nike",
      variant: "Black | UK 9",
      seller: "Nike India",
      quantity: 2,
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900",
      price: 6999,
    },
    {
      id: 2,
      name: "Nike Sports Socks",
      brand: "Nike",
      variant: "Pack of 3",
      seller: "Nike India",
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=900",
      price: 799,
    },
  ],

  price: {
    totalMRP: 14797,
    discount: 2000,
    coupon: 500,
    deliveryCharge: 0,
    platformFee: 10,
    gst: 1080,
    totalAmount: 13387,
  },

  payment: {
    status: "Paid",
    method: "UPI",
    transactionId: "TXN983472983",
    paidOn: "08 August 2026",
  },

  address: {
    name: "Rahul Sharma",
    phone: "9876543210",
    line1: "Flat 204",
    line2: "Sector 62",
    city: "Noida",
    state: "Uttar Pradesh",
    pincode: "201309",
  },

  timeline: [
    {
      title: "Order Placed",
      time: "08 Aug 2026 • 10:32 AM",
      completed: true,
    },
    {
      title: "Payment Confirmed",
      time: "08 Aug 2026 • 10:35 AM",
      completed: true,
    },
    {
      title: "Packed",
      time: "08 Aug 2026 • 03:15 PM",
      completed: true,
    },
    {
      title: "Shipped",
      time: "09 Aug 2026 • 09:30 AM",
      completed: true,
    },
    {
      title: "Out For Delivery",
      time: "Today • 08:00 AM",
      active: true,
    },
    {
      title: "Delivered",
      time: "",
      completed: false,
    },
  ],
};

export default orderData;