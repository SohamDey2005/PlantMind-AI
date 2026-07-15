export default function Navbar() {

  return (

    <div className="h-16 bg-white border-b flex items-center justify-between px-6">

      <div>

        <h1 className="text-2xl font-bold">

          PlantMind AI

        </h1>

      </div>

      <div className="flex items-center gap-4">

        <span className="font-medium">

          Soham

        </span>

        <img
          src="https://ui-avatars.com/api/?name=Soham"
          className="w-10 h-10 rounded-full"
        />

      </div>

    </div>

  );

}