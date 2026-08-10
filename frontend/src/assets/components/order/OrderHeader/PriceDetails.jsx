import {
  BadgePercent,
  IndianRupee,
  Truck,
  Receipt,
} from "lucide-react";

export default function PriceDetails({ order }) {
  const price = order.price;

  const saved = price.discount + price.coupon;

  return (
    <div className="bg-white rounded-3xl shadow-lg border border-gray-200 overflow-hidden">

      {/* Header */}

      <div className="bg-gray-50 border-b px-6 py-4">

        <h2 className="text-xl font-bold flex items-center gap-2">
          <Receipt size={20} />
          Price Details
        </h2>

      </div>

      {/* Body */}

      <div className="p-6 space-y-5">

        <div className="flex justify-between">
          <span>Total MRP</span>
          <span>₹{price.totalMRP.toLocaleString()}</span>
        </div>

        <div className="flex justify-between text-green-600">
          <span className="flex gap-2 items-center">
            <BadgePercent size={18} />
            Discount
          </span>

          <span>- ₹{price.discount.toLocaleString()}</span>
        </div>

        <div className="flex justify-between text-green-600">
          <span>Coupon Discount</span>

          <span>- ₹{price.coupon.toLocaleString()}</span>
        </div>

        <div className="flex justify-between">

          <span className="flex gap-2 items-center">

            <Truck size={18}/>

            Delivery Charges

          </span>

          <span className="text-green-600 font-semibold">

            FREE

          </span>

        </div>

        <div className="flex justify-between">

          <span>Platform Fee</span>

          <span>

            ₹{price.platformFee}

          </span>

        </div>

        <div className="flex justify-between">

          <span>GST</span>

          <span>

            ₹{price.gst.toLocaleString()}

          </span>

        </div>

        <hr/>

        <div className="flex justify-between text-2xl font-bold">

          <span>Total Amount</span>

          <span className="flex items-center">

            <IndianRupee size={24}/>

            {price.totalAmount.toLocaleString()}

          </span>

        </div>

      </div>

      {/* Footer */}

      <div className="bg-green-50 border-t p-5">

        <p className="text-green-700 font-semibold">

          🎉 You saved ₹{saved.toLocaleString()} on this order.

        </p>

      </div>

    </div>
  );
}