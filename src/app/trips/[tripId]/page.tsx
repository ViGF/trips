import { prisma } from "@/lib/prisma"
import { TripHeader } from "./components/TripHeader"
import { TripReservation } from "@/app/trips/[tripId]/components/TripReservation"

async function getTripDetails(id: string) {
  const data = await prisma.trip.findUniqueOrThrow({
    where: {
      id
    }
  })

  return data
}

export default async function TripDetails({ params }: { params: { tripId: string } }) {
  const trip = await getTripDetails(params.tripId)

  return (
    <div className="container mx-auto">
      <TripHeader trip={trip} />
      <TripReservation trip={trip} />
    </div>
  )
}