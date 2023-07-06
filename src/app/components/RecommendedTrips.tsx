import { Trip } from "@prisma/client";
import { CategoryDivider } from "./CategoryDivider";
import { TripItem } from "@/components/TripItem";

export async function RecommendedTrips() {
  const data = await fetch('http://localhost:3000/api/hello').then(res => res.json())

  return (
    <div className="container mx-auto p-5 pt-0">
      <CategoryDivider text="Destinos recomendados" />
      <div className="flex flex-col items-center mt-5 gap-5">
        {data.map((trip: Trip) => (
          <TripItem key={trip.id} trip={trip} />
        ))}
      </div>
    </div>
  )
}