import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex justify-center py-16">
      <Loader2
        className="animate-spin text-blue-600"
        size={40}
      />
    </div>
  );
}