import Card from "./Card";

export default function StatCard({
  title,
  value,
  icon: Icon,
  color,
  bg,
}) {
  return (
    <Card className="hover:shadow-lg transition duration-300 hover:-translate-y-1">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-gray-500 text-sm">
            {title}
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {value}
          </h2>

        </div>

        <div
          className={`w-14 h-14 rounded-xl flex items-center justify-center ${bg}`}
        >
          <Icon className={color} size={28} />
        </div>

      </div>

    </Card>
  );
}