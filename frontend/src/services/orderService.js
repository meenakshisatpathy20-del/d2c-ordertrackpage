const API_URL = "http://127.0.0.1:5000/api/orders";

export const getOrder = async (orderId, phone) => {
  try {
    const cleanOrderId = orderId.trim();
    const cleanPhone = phone.trim();

    const url =
      `${API_URL}/${encodeURIComponent(cleanOrderId)}` +
      `?phone=${encodeURIComponent(cleanPhone)}`;

    console.log("Calling API:", url);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    console.log("Response status:", response.status);

    const data = await response.json();

    console.log("Response data:", data);

    if (!response.ok) {
      throw new Error(data.message || "Order not found");
    }

    return data.order;

  } catch (error) {
    console.error("API ERROR:", error);

    if (error.message === "Failed to fetch") {
      throw new Error(
        "Unable to connect to the backend. Make sure server.js is running on port 5000."
      );
    }

    throw error;
  }
};