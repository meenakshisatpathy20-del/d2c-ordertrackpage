import {
  Package,
  CalendarDays,
  Truck,
  Store,
  Hash,
} from "lucide-react";

export default function OrderDetails({ order }) {
  return (
    <div className="bg-white rounded-3xl shadow-lg border border-gray-200 overflow-hidden">

      {/* Header */}

      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 flex flex-col md:flex-row justify-between">

        <div>
          <p className="text-sm opacity-80">Order ID</p>
          <h2 className="text-2xl font-bold">{order.orderId}</h2>

          <p className="mt-2 text-sm opacity-80">
            Ordered on {order.orderDate}
          </p>
        </div>

        <div className="mt-4 md:mt-0">
          <span className="bg-green-500 px-4 py-2 rounded-full font-semibold">
            {order.status}
          </span>
        </div>

      </div>

      {/* Products */}

      <div className="p-8 space-y-8">

        {order.products.map((product) => (

          <div
            key={product.id}
            className="grid lg:grid-cols-4 gap-6 border rounded-2xl p-6 hover:shadow-md transition"
          >

            {/* Image */}

            <div className="flex justify-center">

              <img
                src={product.image}
                alt={product.name}
                className="w-48 h-48 object-cover rounded-xl"
              />

            </div>

            {/* Product */}

            <div className="lg:col-span-2">

              <h3 className="text-2xl font-bold">
                {product.name}
              </h3>

              <p className="text-gray-500 mt-1">
                {product.brand}
              </p>

              <p className="text-gray-500">
                {product.variant}
              </p>

              <div className="mt-6 space-y-3">

                <div className="flex gap-3 items-center">

                  <Package size={18} />

                  Qty : {product.quantity}

                </div>

                <div className="flex gap-3 items-center">

                  <Store size={18} />

                  Seller : {product.seller}

                </div>

                <div className="flex gap-3 items-center">

                  <Hash size={18} />

                  Tracking ID : {order.trackingId}

                </div>

              </div>

            </div>

            {/* Right */}

            <div className="flex flex-col justify-between">

              <div>

                <h2 className="text-3xl font-bold">

                  ₹{product.price.toLocaleString()}

                </h2>

              </div>

              <div className="space-y-3 mt-8">

                <div className="flex gap-3 items-center">

                  <Truck size={18} />

                  {order.deliveryPartner}

                </div>

                <div className="flex gap-3 items-center">

                  <CalendarDays size={18} />

                  {order.expectedDelivery}

                </div>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}