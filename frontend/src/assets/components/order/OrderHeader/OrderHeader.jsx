export default function OrderHeader() {
  return (
    <div className="text-center mb-12">
      <p className="text-blue-600 font-semibold uppercase tracking-widest">
        Order Tracking
      </p>

      <h1 className="text-5xl font-bold text-gray-900 mt-3">
        Track Your Order
      </h1>

      <p className="text-gray-500 mt-4 text-lg max-w-2xl mx-auto">
        Enter your Order ID and Phone Number to view your order status,
        payment details, delivery progress, invoice, and shipping information.
      </p>
    </div>
  );
}