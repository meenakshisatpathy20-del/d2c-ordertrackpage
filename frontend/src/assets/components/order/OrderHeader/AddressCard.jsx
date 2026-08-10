import {
  MapPin,
  Phone,
  User,
  Navigation,
  Copy,
} from "lucide-react";

export default function AddressCard({ order }) {
  const address = order.address;

  const copyAddress = () => {
    const fullAddress = `
${address.name}
${address.line1}
${address.line2}
${address.city}
${address.state}
${address.pincode}
Phone: ${address.phone}
`;

    navigator.clipboard.writeText(fullAddress);
    alert("Address copied!");
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg border border-gray-200 overflow-hidden">

      <div className="bg-gray-50 border-b px-6 py-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <MapPin size={20} />
          Delivery Address
        </h2>
      </div>

      <div className="p-6">

        <div className="space-y-3">

          <div className="flex gap-3 items-center font-semibold">
            <User size={18} />
            {address.name}
          </div>

          <div className="text-gray-600 leading-7">
            <p>{address.line1}</p>
            <p>{address.line2}</p>
            <p>{address.city}</p>
            <p>{address.state}</p>
            <p>{address.pincode}</p>
          </div>

          <div className="flex gap-3 items-center">
            <Phone size={18} />
            {address.phone}
          </div>

        </div>

        <div className="grid grid-cols-2 gap-3 mt-6">

          <button className="border rounded-xl p-3 flex justify-center items-center gap-2 hover:bg-gray-100">
            <Navigation size={18} />
            View Map
          </button>

          <button
            onClick={copyAddress}
            className="border rounded-xl p-3 flex justify-center items-center gap-2 hover:bg-gray-100"
          >
            <Copy size={18} />
            Copy
          </button>

        </div>

      </div>

    </div>
  );
}