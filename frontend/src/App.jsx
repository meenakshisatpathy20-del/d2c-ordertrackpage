import { useState } from "react";

import OrderSearch from "./assets/components/order/OrderHeader/OrderSearch.jsx";
import TrackingOrder from "./assets/components/order/OrderHeader/TrackingOrder.jsx";

function App() {
  const [order, setOrder] = useState(null);

  const [activeComponent, setActiveComponent] =
    useState("search");

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

      <header style={styles.header}>
        <div style={styles.headerInner}>

          <h1 style={styles.logo}>
            Order<span>Track</span>
          </h1>

          <p style={styles.tagline}>
            Simple and secure order tracking
          </p>

        </div>
      </header>

      <nav style={styles.nav}>

        <button
          onClick={() =>
            setActiveComponent("search")
          }
          style={{
            ...styles.navButton,

            ...(activeComponent === "search"
              ? styles.activeButton
              : {}),
          }}
        >
          🔍 Search Order
        </button>

        <button
          onClick={() =>
            order &&
            setActiveComponent("tracking")
          }
          disabled={!order}
          style={{
            ...styles.navButton,

            ...(activeComponent === "tracking"
              ? styles.activeButton
              : {}),

            opacity: order ? 1 : 0.5,
          }}
        >
          📦 Track Order
        </button>

      </nav>

      <main>

        {activeComponent === "search" && (
          <OrderSearch
            setOrder={handleOrderFound}
          />
        )}

        {activeComponent === "tracking" &&
          order && (
            <>
              <div style={styles.backContainer}>

                <button
                  onClick={handleSearchAgain}
                  style={styles.backButton}
                >
                  ← Search Another Order
                </button>

              </div>

              <TrackingOrder order={order} />
            </>
          )}

      </main>

      <footer style={styles.footer}>
        <p>
          © {new Date().getFullYear()} OrderTrack
        </p>

        <p>
          Secure Order Tracking System
        </p>
      </footer>

    </div>
  );
}

const styles = {
  app: {
    minHeight: "100vh",
    background: "#f8fafc",
  },

  header: {
    background: "#ffffff",
    borderBottom:
      "1px solid #e5e7eb",
  },

  headerInner: {
    maxWidth: "1300px",
    margin: "0 auto",
    padding: "25px 40px",
  },

  logo: {
    margin: 0,
    fontSize: "32px",
    fontWeight: "800",
    color: "#111827",
  },

  tagline: {
    margin: "5px 0 0",
    color: "#64748b",
  },

  nav: {
    display: "flex",
    justifyContent: "center",
    gap: "12px",
    padding: "16px",
    background: "#ffffff",
    borderBottom:
      "1px solid #e5e7eb",
  },

  navButton: {
    padding: "11px 22px",
    borderRadius: "9px",
    border:
      "1px solid #d1d5db",
    background: "#ffffff",
    cursor: "pointer",
    fontWeight: "600",
  },

  activeButton: {
    background: "#2563eb",
    borderColor: "#2563eb",
    color: "#ffffff",
  },

  backContainer: {
    maxWidth: "1200px",
    margin: "25px auto 0",
    padding: "0 25px",
  },

  backButton: {
    padding: "10px 17px",
    borderRadius: "8px",
    border:
      "1px solid #d1d5db",
    background: "#ffffff",
    cursor: "pointer",
    fontWeight: "600",
  },

  footer: {
    marginTop: "70px",
    padding: "25px",
    textAlign: "center",
    background: "#111827",
    color: "#9ca3af",
    fontSize: "13px",
  },
};

export default App;