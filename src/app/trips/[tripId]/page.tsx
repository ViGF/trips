import { prisma } from "@/lib/prisma";
import { TripHeader } from "./components/TripHeader";
import { TripReservation } from "@/app/trips/[tripId]/components/TripReservation";
import { TripDescription } from "./components/TripDescription";
import { TripHighlights } from "./components/TripHighlights";
import { TripLocation } from "./components/TripLocation";

async function getTripDetails(id: string) {
  const data = await prisma.trip.findUniqueOrThrow({
    where: {
      id,
    },
  });

  return data;
}

export default async function TripDetails({
  params,
}: {
  params: { tripId: string };
}) {
  const trip = await getTripDetails(params.tripId);

  return (
    <div className="container mx-auto lg:px-20">
      <TripHeader trip={trip} />
      <div className="flex flex-col lg:flex-row lg:mt-6 lg:gap-20">
        <div className="lg:order-2">
          <TripReservation
            tripStartDate={trip.startDate}
            tripEndDate={trip.endDate}
            maxGuests={trip.maxGuests}
            pricePerDay={+trip.pricePerDay}
            tripId={trip.id}
          />
        </div>
        <div className="lg:order-1">
          <TripDescription description={trip.description} />
          <TripHighlights highlights={trip.highlights} />
        </div>
      </div>
      <TripLocation
        location={trip.location}
        locationDescription={trip.locationDescription}
      />
    </div>
  );
}
