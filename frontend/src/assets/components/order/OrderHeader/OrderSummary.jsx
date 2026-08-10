import {
  Package,
  Truck,
  Calendar,
  CircleDollarSign,
} from "lucide-react";

export default function OrderSummary() {
  return (
    <div className="mt-10 bg-white rounded-3xl shadow-lg border border-gray-200 overflow-hidden">

      {/* Top Status Bar */}

      <div className="bg-blue-600 text-white p-6 flex justify-between items-center">

        <div>
          <p className="text-sm opacity-90">Order ID</p>

          <h2 className="text-xl font-bold">ORD202600125</h2>
        </div>

        <div className="bg-green-500 px-4 py-2 rounded-full font-semibold">
          Out For Delivery
        </div>

      </div>

      {/* Main */}

      <div className="grid md:grid-cols-3 gap-8 p-8">

        {/* Product Image */}

        <div className="flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"
            alt="shoe"
            className="rounded-2xl w-60 h-60 object-cover"
          />
        </div>

        {/* Product Details */}

        <div>

          <h2 className="text-2xl font-bold">
            Nike Air Max 270
          </h2>

          <p className="text-gray-500 mt-2">
            Black • Size 9
          </p>

          <div className="mt-6 space-y-4">

            <div className="flex items-center gap-3">
              <Package size={20} />
              <span>Quantity : 2</span>
            </div>

            <div className="flex items-center gap-3">
              <Truck size={20} />
              <span>Seller : Nike India</span>
            </div>

            <div className="flex items-center gap-3">
              <Calendar size={20} />
              <span>Ordered : 8 Aug 2026</span>
            </div>

          </div>

        </div>

        {/* Price */}

        <div className="flex flex-col justify-center">

          <div className="flex items-center gap-3">

            <CircleDollarSign />

            <span className="text-4xl font-bold">
              ₹6,999
            </span>

          </div>

          <p className="mt-4 text-green-600 font-semibold">
            Expected Delivery
          </p>

          <h3 className="text-xl font-bold">
            Tomorrow before 8 PM
          </h3>

          <button className="mt-8 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700">
            Download Invoice
          </button>

        </div>

      </div>

    </div>
  );
}