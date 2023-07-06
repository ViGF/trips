import { prisma } from "@/lib/prisma"
import { TripHeader } from "./components/TripHeader"

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
    </div>
  )
}