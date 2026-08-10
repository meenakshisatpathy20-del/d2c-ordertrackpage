import { AlertCircle } from "lucide-react";

export default function Error() {
  return (
    <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">

      <AlertCircle
        size={40}
        className="mx-auto text-red-500"
      />

      <h2 className="text-xl font-bold mt-4">
        Order Not Found
      </h2>

      <p className="text-gray-500 mt-2">
        Please check your Order ID and Phone Number.
      </p>

    </div>
  );
}