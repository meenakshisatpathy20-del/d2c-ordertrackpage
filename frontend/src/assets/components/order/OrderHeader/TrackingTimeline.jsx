import {
  CheckCircle2,
  Circle,
  PackageCheck,
  Truck,
  Home,
} from "lucide-react";

export default function TrackingTimeline({ order }) {
  const getIcon = (title) => {
    switch (title) {
      case "Order Placed":
        return <CheckCircle2 size={20} />;
      case "Payment Confirmed":
        return <CheckCircle2 size={20} />;
      case "Packed":
        return <PackageCheck size={20} />;
      case "Shipped":
        return <Truck size={20} />;
      case "Out For Delivery":
        return <Truck size={20} />;
      case "Delivered":
        return <Home size={20} />;
      default:
        return <Circle size={20} />;
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold">Delivery Tracking</h2>
          <p className="text-gray-500 text-sm">
            Tracking ID : {order.trackingId}
          </p>
        </div>

        <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">
          {order.status}
        </span>
      </div>

      {/* Timeline */}
      <div className="relative ml-4 border-l-2 border-gray-200">
        {order.timeline.map((step, index) => (
          <div key={index} className="relative pl-10 pb-10">
            {/* Icon */}
            <div
              className={`absolute -left-5 w-10 h-10 rounded-full flex items-center justify-center
              ${
                step.completed
                  ? "bg-green-500 text-white"
                  : step.active
                  ? "bg-blue-600 text-white animate-pulse"
                  : "bg-gray-200 text-gray-400"
              }`}
            >
              {getIcon(step.title)}
            </div>

            {/* Content */}
            <h3 className="font-semibold text-lg">{step.title}</h3>

            <p className="text-gray-500 text-sm">{step.time || "Pending"}</p>

            {step.active && (
              <span className="inline-block mt-3 bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
                Current Status
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}