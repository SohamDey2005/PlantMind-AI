import Card from "./Card";

export default function ActivityTimeline({
  activities,
}) {
  return (
    <Card>
      <h2 className="font-bold text-lg mb-5">
        Activity Timeline
      </h2>

      <div className="space-y-4">
        {activities.map((item, index) => (
          <div
            key={index}
            className="flex gap-3"
          >
            <div className="w-3 h-3 rounded-full bg-blue-600 mt-2"></div>

            <div className="border-l-2 border-gray-300 pl-4 pb-4">
              <p>{item}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}