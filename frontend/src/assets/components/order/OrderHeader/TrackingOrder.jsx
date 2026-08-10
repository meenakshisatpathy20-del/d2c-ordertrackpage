import React from "react";

export default function TrackingOrder({ order }) {
  if (!order) {
    return (
      <div style={styles.empty}>
        <div style={styles.emptyIcon}>📦</div>

        <h2>No order selected</h2>

        <p>
          Search for an order using your Order ID and phone number
          to view complete tracking information.
        </p>
      </div>
    );
  }

  // Support both:
  // order directly
  // OR { success: true, order: {...} }
  const data = order.order || order;

  const items = data.items || [];
  const tracking = data.tracking || [];

  const payment = data.payment || {};
  const customer = data.customer || {};
  const address = data.shippingAddress || {};
  const shipment = data.shipment || {};
  const price = data.price || {};

  return (
    <div style={styles.page}>

      {/* ===================================== */}
      {/* ORDER HEADER */}
      {/* ===================================== */}

      <section style={styles.hero}>

        <div>
          <p style={styles.smallTitle}>ORDER TRACKING</p>

          <h1 style={styles.orderTitle}>
            Order #{data.orderId}
          </h1>

          <p style={styles.subtitle}>
            Track your order from placement to delivery.
          </p>
        </div>

        <div style={styles.statusBadge}>
          <span style={styles.statusDot}></span>

          {data.status || "Processing"}
        </div>

      </section>


      {/* ===================================== */}
      {/* DELIVERY SUMMARY */}
      {/* ===================================== */}

      <section style={styles.summaryGrid}>

        <div style={styles.summaryCard}>
          <span style={styles.summaryIcon}>📅</span>

          <div>
            <p style={styles.cardLabel}>ORDER DATE</p>

            <strong>{data.orderDate || "N/A"}</strong>
          </div>
        </div>


        <div style={styles.summaryCard}>
          <span style={styles.summaryIcon}>🚚</span>

          <div>
            <p style={styles.cardLabel}>ESTIMATED DELIVERY</p>

            <strong>
              {data.estimatedDelivery || "N/A"}
            </strong>
          </div>
        </div>


        <div style={styles.summaryCard}>
          <span style={styles.summaryIcon}>💳</span>

          <div>
            <p style={styles.cardLabel}>PAYMENT</p>

            <strong style={styles.paid}>
              {payment.status || "Pending"}
            </strong>
          </div>
        </div>


        <div style={styles.summaryCard}>
          <span style={styles.summaryIcon}>🔄</span>

          <div>
            <p style={styles.cardLabel}>LAST UPDATED</p>

            <strong>
              {data.lastUpdated || "N/A"}
            </strong>
          </div>
        </div>

      </section>


      {/* ===================================== */}
      {/* ORDER + DELIVERY INFORMATION */}
      {/* ===================================== */}

      <section style={styles.twoColumns}>

        {/* ORDER INFORMATION */}

        <div style={styles.card}>

          <h2 style={styles.sectionTitle}>
            Order Information
          </h2>

          <InfoRow
            label="Order ID"
            value={data.orderId}
          />

          <InfoRow
            label="Order Date"
            value={data.orderDate}
          />

          <InfoRow
            label="Current Status"
            value={data.status}
            highlight
          />

          <InfoRow
            label="Last Updated"
            value={data.lastUpdated}
          />

        </div>


        {/* DELIVERY INFORMATION */}

        <div style={styles.card}>

          <h2 style={styles.sectionTitle}>
            Delivery Information
          </h2>

          <InfoRow
            label="Delivery Partner"
            value={shipment.courier}
          />

          <InfoRow
            label="Tracking Number"
            value={shipment.trackingNumber}
          />

          <InfoRow
            label="Current Location"
            value={shipment.currentLocation}
          />

          <InfoRow
            label="Delivery Type"
            value={shipment.deliveryType}
          />

        </div>

      </section>


      {/* ===================================== */}
      {/* CUSTOMER INFORMATION */}
      {/* ===================================== */}

      <section style={styles.card}>

        <h2 style={styles.sectionTitle}>
          Customer & Delivery Address
        </h2>

        <div style={styles.customerGrid}>

          <div>

            <h3 style={styles.subHeading}>
              Customer Details
            </h3>

            <p style={styles.customerName}>
              {customer.name || "Customer"}
            </p>

            <p style={styles.contact}>
              📞 {customer.phone || "N/A"}
            </p>

            <p style={styles.contact}>
              ✉️ {customer.email || "N/A"}
            </p>

          </div>


          <div>

            <h3 style={styles.subHeading}>
              Shipping Address
            </h3>

            <p style={styles.addressName}>
              {address.name || customer.name}
            </p>

            <p style={styles.address}>
              {address.line1}
              <br />

              {address.line2 && (
                <>
                  {address.line2}
                  <br />
                </>
              )}

              {address.city}, {address.state}
              <br />

              {address.pincode}
              <br />

              {address.country}
            </p>

          </div>

        </div>

      </section>


      {/* ===================================== */}
      {/* ITEMS */}
      {/* ===================================== */}

      <section style={styles.card}>

        <div style={styles.sectionHeader}>

          <div>
            <h2 style={styles.sectionTitle}>
              Items in Your Order
            </h2>

            <p style={styles.muted}>
              {items.length} product{items.length !== 1 ? "s" : ""}
            </p>
          </div>

        </div>


        <div>

          {items.map((item, index) => {

            const itemTotal =
              Number(item.price || 0) *
              Number(item.quantity || 0);

            return (
              <div
                key={index}
                style={styles.item}
              >

                <div style={styles.productIcon}>
                  {item.image || "📦"}
                </div>


                <div style={styles.productInfo}>

                  <h3 style={styles.productName}>
                    {item.name}
                  </h3>

                  <p style={styles.sku}>
                    SKU: {item.sku || "N/A"}
                  </p>

                  <div style={styles.tags}>

                    {item.size && (
                      <span style={styles.tag}>
                        Size: {item.size}
                      </span>
                    )}

                    {item.color && (
                      <span style={styles.tag}>
                        Color: {item.color}
                      </span>
                    )}

                    <span style={styles.tag}>
                      Qty: {item.quantity}
                    </span>

                  </div>

                </div>


                <div style={styles.itemPrice}>

                  <span>
                    ₹{Number(item.price || 0).toLocaleString("en-IN")}
                  </span>

                  <small>
                    Total: ₹{itemTotal.toLocaleString("en-IN")}
                  </small>

                </div>

              </div>
            );
          })}

        </div>

      </section>


      {/* ===================================== */}
      {/* PAYMENT + PRICE */}
      {/* ===================================== */}

      <section style={styles.twoColumns}>

        {/* PRICE */}

        <div style={styles.card}>

          <h2 style={styles.sectionTitle}>
            Price Details
          </h2>

          <PriceRow
            label="Subtotal"
            value={price.subtotal}
          />

          <PriceRow
            label="Discount"
            value={price.discount}
            negative
          />

          <PriceRow
            label="Shipping"
            value={price.shipping}
          />

          <PriceRow
            label="Tax"
            value={price.tax}
          />

          <div style={styles.totalRow}>

            <strong>Total Amount</strong>

            <strong>
              ₹{Number(price.total || 0).toLocaleString("en-IN")}
            </strong>

          </div>

        </div>


        {/* PAYMENT */}

        <div style={styles.card}>

          <h2 style={styles.sectionTitle}>
            Payment Details
          </h2>

          <InfoRow
            label="Payment Status"
            value={payment.status}
            highlight
          />

          <InfoRow
            label="Payment Method"
            value={payment.method}
          />

          <InfoRow
            label="Transaction ID"
            value={payment.transactionId}
          />

          <div style={styles.paymentSuccess}>
            ✓ Payment successfully received
          </div>

        </div>

      </section>


      {/* ===================================== */}
      {/* TRACKING TIMELINE */}
      {/* ===================================== */}

      <section style={styles.card}>

        <div style={styles.sectionHeader}>

          <div>

            <h2 style={styles.sectionTitle}>
              Tracking History
            </h2>

            <p style={styles.muted}>
              Follow your package from order placement
              to final delivery.
            </p>

          </div>

        </div>


        <div style={styles.timeline}>

          {tracking.map((step, index) => (

            <div
              key={index}
              style={styles.timelineItem}
            >

              <div
                style={{
                  ...styles.timelineIcon,

                  ...(step.completed
                    ? styles.timelineCompleted
                    : styles.timelinePending),

                  ...(step.current
                    ? styles.timelineCurrent
                    : {}),
                }}
              >
                {step.icon || "○"}
              </div>


              {index < tracking.length - 1 && (
                <div
                  style={{
                    ...styles.timelineLine,

                    ...(step.completed
                      ? styles.timelineLineCompleted
                      : {}),
                  }}
                />
              )}


              <div style={styles.timelineContent}>

                <div style={styles.timelineHeader}>

                  <h3 style={styles.timelineTitle}>
                    {step.title}
                  </h3>

                  {step.current && (
                    <span style={styles.currentBadge}>
                      CURRENT
                    </span>
                  )}

                </div>


                <p style={styles.timelineDescription}>
                  {step.description}
                </p>


                {step.date && (
                  <p style={styles.timelineDate}>
                    {step.date} • {step.time}
                  </p>
                )}

                {!step.completed && (
                  <p style={styles.waiting}>
                    Waiting for this step
                  </p>
                )}

              </div>

            </div>

          ))}

        </div>

      </section>


      {/* ===================================== */}
      {/* SUPPORT */}
      {/* ===================================== */}

      <section style={styles.helpCard}>

        <div>

          <h2 style={styles.helpTitle}>
            Need help with your order?
          </h2>

          <p style={styles.helpText}>
            If you have questions about your delivery,
            payment, or order details, our support team
            is here to help.
          </p>

        </div>

        <button
          style={styles.helpButton}
          onClick={() =>
            alert("Customer support will be available soon.")
          }
        >
          Contact Support
        </button>

      </section>

    </div>
  );
}


/* ========================================= */
/* INFO ROW */
/* ========================================= */

function InfoRow({ label, value, highlight }) {
  return (
    <div style={styles.infoRow}>

      <span style={styles.infoLabel}>
        {label}
      </span>

      <strong
        style={
          highlight
            ? styles.infoValueHighlight
            : styles.infoValue
        }
      >
        {value || "N/A"}
      </strong>

    </div>
  );
}


/* ========================================= */
/* PRICE ROW */
/* ========================================= */

function PriceRow({ label, value, negative }) {
  return (
    <div style={styles.priceRow}>

      <span>
        {label}
      </span>

      <span
        style={negative ? styles.discount : undefined}
      >
        {negative ? "-" : ""}
        ₹{Number(value || 0).toLocaleString("en-IN")}
      </span>

    </div>
  );
}


/* ========================================= */
/* STYLES */
/* ========================================= */

const styles = {

  page: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "40px 24px 80px",
    fontFamily:
      "Inter, Arial, Helvetica, sans-serif",
    color: "#17202a",
    background: "#f6f8fb",
  },

  empty: {
    textAlign: "center",
    padding: "100px 20px",
  },

  emptyIcon: {
    fontSize: "60px",
    marginBottom: "20px",
  },

  hero: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "30px",
    marginBottom: "28px",
  },

  smallTitle: {
    color: "#2563eb",
    fontWeight: "700",
    fontSize: "13px",
    letterSpacing: "1.5px",
    margin: "0 0 8px",
  },

  orderTitle: {
    fontSize: "34px",
    margin: "0 0 8px",
    fontWeight: "800",
  },

  subtitle: {
    color: "#64748b",
    fontSize: "16px",
    margin: 0,
  },

  statusBadge: {
    background: "#dcfce7",
    color: "#15803d",
    padding: "14px 24px",
    borderRadius: "30px",
    fontWeight: "700",
    fontSize: "16px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    whiteSpace: "nowrap",
  },

  statusDot: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    background: "#16a34a",
    display: "inline-block",
  },

  summaryGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "16px",
    marginBottom: "24px",
  },

  summaryCard: {
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "14px",
    padding: "20px",
    display: "flex",
    alignItems: "center",
    gap: "15px",
    boxShadow:
      "0 3px 12px rgba(15, 23, 42, 0.05)",
  },

  summaryIcon: {
    fontSize: "28px",
  },

  cardLabel: {
    margin: "0 0 5px",
    color: "#64748b",
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "1px",
  },

  paid: {
    color: "#16a34a",
  },

  twoColumns: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(350px, 1fr))",
    gap: "24px",
    marginBottom: "24px",
  },

  card: {
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "16px",
    padding: "28px",
    marginBottom: "24px",
    boxShadow:
      "0 4px 16px rgba(15, 23, 42, 0.05)",
  },

  sectionTitle: {
    fontSize: "21px",
    margin: "0 0 20px",
    fontWeight: "750",
  },

  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
  },

  muted: {
    color: "#64748b",
    margin: "-12px 0 20px",
    fontSize: "14px",
  },

  infoRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: "20px",
    padding: "16px 0",
    borderBottom: "1px solid #eef2f7",
  },

  infoLabel: {
    color: "#64748b",
  },

  infoValue: {
    textAlign: "right",
    color: "#17202a",
  },

  infoValueHighlight: {
    textAlign: "right",
    color: "#2563eb",
  },

  customerGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "50px",
  },

  subHeading: {
    fontSize: "14px",
    color: "#64748b",
    textTransform: "uppercase",
    letterSpacing: "0.8px",
    marginBottom: "14px",
  },

  customerName: {
    fontWeight: "750",
    fontSize: "18px",
    marginBottom: "12px",
  },

  contact: {
    color: "#475569",
    margin: "8px 0",
  },

  addressName: {
    fontWeight: "700",
    marginBottom: "10px",
  },

  address: {
    color: "#475569",
    lineHeight: "1.7",
    margin: 0,
  },

  item: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    padding: "22px 0",
    borderTop: "1px solid #eef2f7",
  },

  productIcon: {
    width: "70px",
    height: "70px",
    borderRadius: "12px",
    background: "#f1f5f9",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "34px",
    flexShrink: 0,
  },

  productInfo: {
    flex: 1,
  },

  productName: {
    margin: "0 0 6px",
    fontSize: "17px",
  },

  sku: {
    color: "#64748b",
    fontSize: "13px",
    margin: "0 0 10px",
  },

  tags: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
  },

  tag: {
    background: "#f1f5f9",
    color: "#475569",
    padding: "5px 9px",
    borderRadius: "6px",
    fontSize: "12px",
  },

  itemPrice: {
    textAlign: "right",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    fontWeight: "700",
  },

  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: "20px",
    marginTop: "10px",
    borderTop: "2px solid #e2e8f0",
    fontSize: "19px",
  },

  priceRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 0",
    color: "#475569",
  },

  discount: {
    color: "#16a34a",
  },

  paymentSuccess: {
    marginTop: "18px",
    padding: "12px",
    borderRadius: "8px",
    background: "#dcfce7",
    color: "#15803d",
    fontWeight: "600",
    textAlign: "center",
  },

  timeline: {
    position: "relative",
  },

  timelineItem: {
    display: "flex",
    position: "relative",
    minHeight: "100px",
    gap: "18px",
  },

  timelineIcon: {
    width: "46px",
    height: "46px",
    minWidth: "46px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#ffffff",
    fontSize: "18px",
    fontWeight: "700",
    position: "relative",
    zIndex: 2,
  },

  timelineCompleted: {
    background: "#16a34a",
  },

  timelinePending: {
    background: "#cbd5e1",
    color: "#64748b",
  },

  timelineCurrent: {
    boxShadow:
      "0 0 0 6px rgba(37, 99, 235, 0.12)",
    background: "#2563eb",
  },

  timelineLine: {
    position: "absolute",
    left: "22px",
    top: "46px",
    bottom: "0",
    width: "2px",
    background: "#e2e8f0",
  },

  timelineLineCompleted: {
    background: "#16a34a",
  },

  timelineContent: {
    paddingBottom: "30px",
    flex: 1,
  },

  timelineHeader: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },

  timelineTitle: {
    margin: "4px 0 6px",
    fontSize: "17px",
  },

  timelineDescription: {
    margin: "0 0 7px",
    color: "#475569",
  },

  timelineDate: {
    margin: 0,
    color: "#64748b",
    fontSize: "13px",
  },

  waiting: {
    color: "#94a3b8",
    fontSize: "13px",
    fontStyle: "italic",
    margin: "6px 0 0",
  },

  currentBadge: {
    background: "#dbeafe",
    color: "#2563eb",
    fontSize: "10px",
    fontWeight: "800",
    padding: "5px 8px",
    borderRadius: "5px",
  },

  helpCard: {
    background:
      "linear-gradient(135deg, #1d4ed8, #2563eb)",
    color: "#ffffff",
    borderRadius: "16px",
    padding: "28px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "20px",
  },

  helpTitle: {
    margin: "0 0 8px",
    fontSize: "21px",
  },

  helpText: {
    margin: 0,
    opacity: 0.9,
    lineHeight: "1.6",
    maxWidth: "650px",
  },

  helpButton: {
    border: "none",
    background: "#ffffff",
    color: "#2563eb",
    padding: "13px 20px",
    borderRadius: "9px",
    fontWeight: "700",
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
};