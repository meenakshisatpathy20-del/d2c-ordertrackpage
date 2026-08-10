import { useState } from "react";

export default function OrderSearch({ setOrder }) {
  const [orderId, setOrderId] = useState("");
  const [phone, setPhone] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (event) => {
    event.preventDefault();

    setError("");

    const cleanOrderId = orderId.trim();
    const cleanPhone = phone.trim();

    if (!cleanOrderId || !cleanPhone) {
      setError(
        "Please enter both your Order ID and phone number."
      );
      return;
    }

    if (!/^\d{10}$/.test(cleanPhone)) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    setLoading(true);

    try {
      /*
       * IMPORTANT:
       * We use a relative URL.
       *
       * This means:
       *
       * https://yourwebsite.vercel.app
       *              ↓
       * /api/orders/track
       *
       * Everything is served from ONE website.
       */

      const response = await fetch("/api/orders/track", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          orderId: cleanOrderId,
          phone: cleanPhone,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Order could not be found."
        );
      }

      if (!data.order) {
        throw new Error(
          "Order information was not returned."
        );
      }

      setOrder(data.order);
    } catch (error) {
      console.error("Order search error:", error);

      setError(
        error.message ||
          "Unable to connect to the order tracking service."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        <div style={styles.header}>
          <div style={styles.icon}>📦</div>

          <h1 style={styles.title}>
            Track Your Order
          </h1>

          <p style={styles.subtitle}>
            Enter your Order ID and registered phone
            number to view your complete order details.
          </p>
        </div>

        <form
          onSubmit={handleSearch}
          style={styles.form}
        >
          <div style={styles.field}>
            <label style={styles.label}>
              Order ID
            </label>

            <input
              type="text"
              value={orderId}
              onChange={(e) =>
                setOrderId(e.target.value)
              }
              placeholder="e.g. ORD-10001"
              style={styles.input}
              disabled={loading}
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>
              Phone Number
            </label>

            <input
              type="tel"
              value={phone}
              onChange={(e) => {
                const value =
                  e.target.value.replace(/\D/g, "");

                setPhone(value.slice(0, 10));
              }}
              placeholder="10-digit phone number"
              style={styles.input}
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.button,
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading
              ? "Searching..."
              : "Track Order →"}
          </button>
        </form>

        {error && (
          <div style={styles.error}>
            <div style={styles.errorTitle}>
              ⚠️ Unable to find order
            </div>

            <div>{error}</div>
          </div>
        )}

        <div style={styles.cards}>

          <div style={styles.card}>
            <div style={styles.cardIcon}>
              🔒
            </div>

            <h3>Secure</h3>

            <p>
              Your order information is protected
              using your Order ID and registered
              phone number.
            </p>
          </div>

          <div style={styles.card}>
            <div style={styles.cardIcon}>
              📍
            </div>

            <h3>Real-Time Tracking</h3>

            <p>
              Check your current order status and
              shipment progress.
            </p>
          </div>

          <div style={styles.card}>
            <div style={styles.cardIcon}>
              📋
            </div>

            <h3>Complete Details</h3>

            <p>
              View products, payment, delivery
              address and tracking history.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "calc(100vh - 150px)",
    background: "#f8fafc",
    padding: "55px 20px",
  },

  container: {
    maxWidth: "1100px",
    margin: "0 auto",
  },

  header: {
    textAlign: "center",
    marginBottom: "40px",
  },

  icon: {
    fontSize: "45px",
    marginBottom: "10px",
  },

  title: {
    margin: 0,
    fontSize: "42px",
    fontWeight: "800",
    color: "#111827",
  },

  subtitle: {
    maxWidth: "650px",
    margin: "14px auto 0",
    color: "#64748b",
    fontSize: "17px",
    lineHeight: "1.6",
  },

  form: {
    background: "#ffffff",
    padding: "30px",
    borderRadius: "18px",
    border: "1px solid #e5e7eb",
    boxShadow:
      "0 8px 25px rgba(0,0,0,0.05)",

    display: "grid",
    gridTemplateColumns:
      "1fr 1fr auto",

    gap: "20px",
    alignItems: "end",
  },

  field: {
    display: "flex",
    flexDirection: "column",
  },

  label: {
    fontSize: "15px",
    fontWeight: "700",
    color: "#374151",
    marginBottom: "9px",
  },

  input: {
    width: "100%",
    height: "56px",
    boxSizing: "border-box",
    padding: "0 16px",
    border: "1px solid #cbd5e1",
    borderRadius: "10px",
    fontSize: "16px",
    outline: "none",
  },

  button: {
    height: "56px",
    padding: "0 28px",
    border: "none",
    borderRadius: "10px",
    background: "#2563eb",
    color: "#ffffff",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
    whiteSpace: "nowrap",
  },

  error: {
    marginTop: "20px",
    padding: "18px",
    borderRadius: "12px",
    background: "#fef2f2",
    border: "1px solid #fecaca",
    color: "#b91c1c",
    lineHeight: "1.6",
  },

  errorTitle: {
    fontWeight: "800",
    marginBottom: "5px",
  },

  cards: {
    display: "grid",
    gridTemplateColumns:
      "repeat(3, 1fr)",
    gap: "20px",
    marginTop: "40px",
  },

  card: {
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "15px",
    padding: "25px",
  },

  cardIcon: {
    fontSize: "30px",
    marginBottom: "8px",
  },
};