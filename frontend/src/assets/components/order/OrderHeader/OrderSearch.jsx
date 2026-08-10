import React, { useState } from "react";

export default function OrderSearch({ setOrder }) {
  const [orderId, setOrderId] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();

    setError("");

    if (!orderId.trim() || !phone.trim()) {
      setError("Please enter both Order ID and Phone Number.");
      return;
    }

    if (phone.length !== 10) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/orders/track",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orderId: orderId.trim(),
            phone: phone.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Order not found.");
      }

      // Send complete order information to App.jsx
      setOrder(data.order || data);

    } catch (err) {
      console.error("Order search error:", err);

      setError(
        err.message ||
          "Unable to connect to the backend. Make sure server.js is running on port 5000."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        {/* Heading */}
        <div style={styles.header}>
          <h1 style={styles.title}>Where is my order?</h1>

          <p style={styles.subtitle}>
            Enter your order details to track your delivery.
          </p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch}>

          <div style={styles.formGrid}>

            {/* Order ID */}
            <div style={styles.field}>
              <label style={styles.label}>
                Order ID
              </label>

              <input
                type="text"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="e.g. ORD-20260808001"
                style={styles.input}
              />
            </div>

            {/* Phone */}
            <div style={styles.field}>
              <label style={styles.label}>
                Phone Number
              </label>

              <input
                type="tel"
                value={phone}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  setPhone(value.slice(0, 10));
                }}
                placeholder="Enter 10-digit phone number"
                style={styles.input}
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                ...styles.button,
                opacity: loading ? 0.7 : 1,
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "Searching..." : "Track Order"}
            </button>

          </div>
        </form>

        {/* Error */}
        {error && (
          <div style={styles.error}>
            <strong>Unable to find order</strong>
            <p style={{ margin: "6px 0 0" }}>{error}</p>
          </div>
        )}

        {/* Information */}
        <div style={styles.infoSection}>

          <div style={styles.infoCard}>
            <div style={styles.icon}>🔒</div>

            <div>
              <h3 style={styles.infoTitle}>
                Secure Tracking
              </h3>

              <p style={styles.infoText}>
                Your order can only be accessed using your
                Order ID and registered phone number.
              </p>
            </div>
          </div>

          <div style={styles.infoCard}>
            <div style={styles.icon}>📦</div>

            <div>
              <h3 style={styles.infoTitle}>
                Complete Order Details
              </h3>

              <p style={styles.infoText}>
                View your order status, items, quantities,
                payment details, delivery address and tracking
                timeline.
              </p>
            </div>
          </div>

          <div style={styles.infoCard}>
            <div style={styles.icon}>🚚</div>

            <div>
              <h3 style={styles.infoTitle}>
                Real-Time Tracking
              </h3>

              <p style={styles.infoText}>
                Follow your order from placement to processing,
                dispatch, delivery and completion.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "calc(100vh - 120px)",
    background: "#f8fafc",
    padding: "70px 40px",
  },

  container: {
    maxWidth: "1200px",
    margin: "0 auto",
  },

  header: {
    textAlign: "center",
    marginBottom: "55px",
  },

  title: {
    fontSize: "48px",
    fontWeight: "700",
    margin: "0 0 15px",
    color: "#111827",
  },

  subtitle: {
    fontSize: "20px",
    color: "#64748b",
    margin: 0,
  },

  formGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 0.9fr",
    gap: "20px",
    alignItems: "end",
  },

  field: {
    display: "flex",
    flexDirection: "column",
  },

  label: {
    fontSize: "17px",
    fontWeight: "600",
    marginBottom: "10px",
    color: "#111827",
  },

  input: {
    width: "100%",
    boxSizing: "border-box",
    height: "66px",
    padding: "0 20px",
    fontSize: "18px",
    border: "1px solid #1f2937",
    borderRadius: "14px",
    outline: "none",
    background: "#ffffff",
  },

  button: {
    height: "66px",
    border: "none",
    borderRadius: "14px",
    background: "#2563eb",
    color: "white",
    fontSize: "19px",
    fontWeight: "700",
  },

  error: {
    marginTop: "25px",
    padding: "18px 22px",
    borderRadius: "12px",
    background: "#fef2f2",
    border: "1px solid #fecaca",
    color: "#dc2626",
    fontSize: "16px",
  },

  infoSection: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",
    marginTop: "55px",
  },

  infoCard: {
    display: "flex",
    gap: "16px",
    padding: "25px",
    background: "#ffffff",
    borderRadius: "16px",
    border: "1px solid #e5e7eb",
    boxShadow: "0 4px 15px rgba(0,0,0,0.04)",
  },

  icon: {
    fontSize: "30px",
  },

  infoTitle: {
    margin: "0 0 8px",
    fontSize: "18px",
    color: "#111827",
  },

  infoText: {
    margin: 0,
    color: "#64748b",
    lineHeight: "1.6",
    fontSize: "14px",
  },
};