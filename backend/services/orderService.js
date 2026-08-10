const API_URL = "http://localhost:5000/api/orders";

export const getOrder = async (orderId, phone) => {
  const response = await fetch(
    `${API_URL}/${orderId}?phone=${phone}`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Order not found");
  }

  return data.order;
};