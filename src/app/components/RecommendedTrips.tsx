import { CategoryDivider } from "./CategoryDivider";
import { TripItem } from "@/components/TripItem";
import { prisma } from "@/lib/prisma";
import { Decimal } from "@prisma/client/runtime";
interface TripItemProps {
  id: string;
  coverImage: string;
  name: string;
  countryCode: string;
  location: string;
  pricePerDay: Decimal;
}

async function getTrips() {
  const data = await prisma.trip.findMany({
    select: {
      id: true,
      coverImage: true,
      name: true,
      countryCode: true,
      location: true,
      pricePerDay: true,
    },
  });

  return data;
}

export async function RecommendedTrips() {
  const data = await getTrips();

  return (
    <div className="container mx-auto p-5 pt-0">
      <CategoryDivider text="Destinos recomendados" />
      <div className="mt-5 flex flex-col items-center gap-5 lg:flex lg:flex-wrap lg:flex-row lg:justify-center lg:gap-10 lg:mt-12">
        {data.map((trip: TripItemProps) => (
          <TripItem key={trip.id} trip={trip} />
        ))}
      </div>
    </div>
  );
}
