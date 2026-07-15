import Card from "./Card";
import { Bot } from "lucide-react";

export default function RecommendationCard() {
  return (
    <Card>

      <div className="flex items-center gap-2 mb-5">

        <Bot className="text-blue-600"/>

        <h2 className="font-bold text-lg">
          AI Recommendation
        </h2>

      </div>

      <p className="text-gray-700">
        Pump P-101 maintenance is overdue by
        <span className="text-red-600 font-semibold">
          {" "}15 days.
        </span>
      </p>

      <div className="mt-6">

        <div className="flex justify-between">

          <span>Confidence</span>

          <span>95%</span>

        </div>

        <div className="w-full bg-gray-200 rounded-full h-3 mt-2">

          <div className="bg-green-500 h-3 rounded-full w-[95%]"></div>

        </div>

      </div>

    </Card>
  );
}