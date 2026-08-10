import { useState } from "react";

import OrderHeader from "../components/order/OrderHeader";
import OrderSearch from "../components/order/OrderSearch";
import OrderDetails from "../components/order/OrderDetails";
import TrackingTimeline from "../components/order/TrackingTimeline";
import PriceDetails from "../components/order/PriceDetails";
import PaymentCard from "../components/order/PaymentCard";
import AddressCard from "../components/order/AddressCard";
import HelpCard from "../components/order/HelpCard";

import orderData from "../data/orderData";

export default function TrackOrder() {

  const [order, setOrder] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-200">

      <div className="max-w-7xl mx-auto p-8">

        <OrderHeader />

        <OrderSearch setOrder={setOrder} />

        {order && (

          <div className="grid lg:grid-cols-3 gap-8 mt-8">

            <div className="lg:col-span-2 space-y-8">

              <OrderDetails order={order} />

              <TrackingTimeline order={order} />

            </div>

            <div className="space-y-8">

              <PriceDetails order={order} />

              <PaymentCard order={order} />

              <AddressCard order={order} />

              <HelpCard />

            </div>

          </div>

        )}

      </div>

    </div>
  );

}