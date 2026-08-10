import {
  CreditCard,
  CheckCircle2,
  CalendarDays,
  Hash,
} from "lucide-react";

export default function PaymentCard({ order }) {

  const payment = order.payment;

  return (

    <div className="bg-white rounded-3xl shadow-lg border border-gray-200 overflow-hidden">

      <div className="bg-gray-50 border-b px-6 py-4">

        <h2 className="text-xl font-bold flex gap-2 items-center">

          <CreditCard size={20}/>

          Payment Details

        </h2>

      </div>

      <div className="p-6 space-y-5">

        <div className="flex justify-between">

          <span>Status</span>

          <span className="text-green-600 font-semibold flex gap-2">

            <CheckCircle2 size={18}/>

            {payment.status}

          </span>

        </div>

        <div className="flex justify-between">

          <span>Payment Method</span>

          <span>{payment.method}</span>

        </div>

        <div className="flex justify-between">

          <span className="flex gap-2 items-center">

            <Hash size={18}/>

            Transaction ID

          </span>

          <span>{payment.transactionId}</span>

        </div>

        <div className="flex justify-between">

          <span className="flex gap-2 items-center">

            <CalendarDays size={18}/>

            Paid On

          </span>

          <span>{payment.paidOn}</span>

        </div>

      </div>

    </div>

  );

}