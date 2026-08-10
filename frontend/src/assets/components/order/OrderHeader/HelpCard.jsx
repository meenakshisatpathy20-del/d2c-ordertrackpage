import {
  Phone,
  Mail,
  MessageCircle,
  FileQuestion,
} from "lucide-react";

export default function HelpCard() {
  return (
    <div className="bg-white rounded-3xl shadow-lg border border-gray-200 overflow-hidden">

      <div className="bg-gray-50 border-b px-6 py-4">
        <h2 className="text-xl font-bold">
          Need Help?
        </h2>
      </div>

      <div className="p-6 space-y-4">

        <button className="w-full border rounded-xl p-4 flex items-center gap-3 hover:bg-slate-50 transition">

          <MessageCircle className="text-blue-600" />

          Live Chat

        </button>

        <button className="w-full border rounded-xl p-4 flex items-center gap-3 hover:bg-slate-50 transition">

          <Phone className="text-green-600" />

          Call Support

        </button>

        <button className="w-full border rounded-xl p-4 flex items-center gap-3 hover:bg-slate-50 transition">

          <Mail className="text-red-500" />

          Email Support

        </button>

        <button className="w-full border rounded-xl p-4 flex items-center gap-3 hover:bg-slate-50 transition">

          <FileQuestion className="text-purple-600" />

          Raise a Ticket

        </button>

      </div>

    </div>
  );
}