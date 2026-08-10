import { useState } from "react";

import OrderSearch from "./assets/components/order/OrderHeader/OrderSearch.jsx";
import TrackingOrder from "./assets/components/order/OrderHeader/TrackingOrder.jsx";

function App() {
  const [order, setOrder] = useState(null);
  const [activeComponent, setActiveComponent] = useState("search");

  const handleOrderFound = (foundOrder) => {
    setOrder(foundOrder);
    setActiveComponent("tracking");
  };

  const handleSearchAgain = () => {
    setOrder(null);
    setActiveComponent("search");
  };

  return (
    <div style={styles.app}>

      {/* HEADER */}
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <h1 style={styles.logo}>
            Order<span style={styles.logoBlue}>Track</span>
          </h1>

          <p style={styles.tagline}>
            Track your order quickly and securely
          </p>
        </div>
      </header>

      {/* NAVIGATION */}
      <nav style={styles.nav}>
        <button
          onClick={() => setActiveComponent("search")}
          style={{
            ...styles.navButton,
            ...(activeComponent === "search"
              ? styles.activeNavButton
              : {}),
          }}
        >
          🔍 Search Order
        </button>

        <button
          onClick={() => setActiveComponent("tracking")}
          disabled={!order}
          style={{
            ...styles.navButton,
            ...(activeComponent === "tracking"
              ? styles.activeNavButton
              : {}),
            opacity: !order ? 0.5 : 1,
            cursor: !order ? "not-allowed" : "pointer",
          }}
        >
          📦 Track Order
        </button>
      </nav>

      {/* MAIN CONTENT */}
      <main>

        {activeComponent === "search" && (
          <OrderSearch setOrder={handleOrderFound} />
        )}

        {activeComponent === "tracking" && (
          <div>

            {order ? (
              <>
                {/* SEARCH AGAIN BUTTON */}
                <div style={styles.backContainer}>
                  <button
                    onClick={handleSearchAgain}
                    style={styles.backButton}
                  >
                    ← Search Another Order
                  </button>
                </div>

                {/* TRACKING DETAILS */}
                <TrackingOrder order={order} />
              </>
            ) : (
              <div style={styles.noOrder}>
                <div style={styles.noOrderIcon}>📦</div>

                <h2>No Order Selected</h2>

                <p>
                  Search for an order using your Order ID and
                  phone number to view tracking details.
                </p>

                <button
                  onClick={() => setActiveComponent("search")}
                  style={styles.primaryButton}
                >
                  Search Order
                </button>
              </div>
            )}

          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <p>
          © {new Date().getFullYear()} OrderTrack. All rights reserved.
        </p>

        <p>
          Secure order tracking system
        </p>
      </footer>

    </div>
  );
}

const styles = {
  app: {
    minHeight: "100vh",
    background: "#f8fafc",
    color: "#111827",
  },

  header: {
    background: "#ffffff",
    borderBottom: "1px solid #e5e7eb",
  },

  headerInner: {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "28px 50px",
  },

  logo: {
    margin: 0,
    fontSize: "34px",
    fontWeight: "800",
    letterSpacing: "-1px",
  },

  logoBlue: {
    color: "#2563eb",
  },

  tagline: {
    margin: "4px 0 0",
    color: "#64748b",
    fontSize: "16px",
  },

  nav: {
    display: "flex",
    justifyContent: "center",
    gap: "12px",
    padding: "18px",
    background: "#ffffff",
    borderBottom: "1px solid #e5e7eb",
  },

  navButton: {
    padding: "12px 24px",
    border: "1px solid #d1d5db",
    borderRadius: "10px",
    background: "#ffffff",
    color: "#374151",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
  },

  activeNavButton: {
    background: "#2563eb",
    color: "#ffffff",
    borderColor: "#2563eb",
  },

  backContainer: {
    maxWidth: "1200px",
    margin: "25px auto 0",
    padding: "0 30px",
  },

  backButton: {
    padding: "11px 18px",
    border: "1px solid #d1d5db",
    borderRadius: "9px",
    background: "#ffffff",
    color: "#374151",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
  },

  noOrder: {
    maxWidth: "600px",
    margin: "100px auto",
    padding: "50px",
    textAlign: "center",
    background: "#ffffff",
    borderRadius: "18px",
    border: "1px solid #e5e7eb",
    boxShadow: "0 8px 30px rgba(0, 0, 0, 0.05)",
  },

  noOrderIcon: {
    fontSize: "55px",
    marginBottom: "15px",
  },

  primaryButton: {
    marginTop: "20px",
    padding: "13px 25px",
    border: "none",
    borderRadius: "10px",
    background: "#2563eb",
    color: "#ffffff",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
  },

  footer: {
    marginTop: "80px",
    padding: "30px",
    textAlign: "center",
    background: "#111827",
    color: "#9ca3af",
    fontSize: "13px",
  },
};

export default App;