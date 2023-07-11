'use client'

import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { TripReservation } from "@prisma/client"

export default function MyTrips() {
  const [reservation, setReservations] = useState<TripReservation[]>([])

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
    <div></div>
  )
}