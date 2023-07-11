'use client'

import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { Prisma } from "@prisma/client"
import { UserReservationItem } from "./components/UserReservationItem"
import { Button } from "@/components/Button"
import Link from "next/link"

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
        `/api/trips/reservation/user/${(data?.user as any).id}`
      ).then(res => res.json())

      setReservations(response)
    }

    fetchReservations()
  }, [status])

  return (
    <main className="container mx-auto p-5">
      <h1 className="font-semibold text-primaryDarker text-xl">Minhas viagens</h1>
      {reservations.length > 0 ? (reservations.map(reservation => (
        <UserReservationItem key={reservation.id} reservation={reservation} />
      ))) : (
        <div className="flex flex-col">
          <p className="font-medium text-primaryDarker text-center mt-2">Você ainda não possui reservas</p>
          <Link href='/'>
            <Button className="w-full mt-2">Fazer reserva</Button>
          </Link>
        </div>
      )}
    </main>
  )
}