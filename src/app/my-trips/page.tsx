'use client'

import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { Prisma } from "@prisma/client"
import { UserReservationItem } from "./components/UserReservationItem"

export default function MyTrips() {
  const [reservations, setReservations] = useState<Prisma.TripReservationGetPayload<{
    include: { trip: true }
  }>[]>([])

  const router = useRouter()
  const { status, data } = useSession()

  useEffect(() => {
    if (status === 'unauthenticated') {
      return router.push('/api/auth/signin')
    }

    if (status === 'loading') {
      return
    }

    const fetchReservations = async () => {
      const response = await fetch(
        `http://localhost:3000/api/trips/reservation/user/${(data?.user as any).id}`
      ).then(res => res.json())

      setReservations(response)
    }

    fetchReservations()
  }, [status])

  return (
    <main className="container mx-auto p-5">
      <h1 className="font-semibold text-primaryDarker text-xl">Minhas viagens</h1>
      {reservations.map(reservation=> (
        <UserReservationItem key={reservation.id} reservation={reservation} />
      ))}
    </main>
  )
}