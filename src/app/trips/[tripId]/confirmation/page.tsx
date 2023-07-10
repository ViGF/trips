'use client'

import { useState, useEffect } from 'react'
import { useSession } from "next-auth/react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Trip } from "@prisma/client"
import ReactCountryFlag from "react-country-flag"
import { format } from "date-fns"
import ptBR from "date-fns/locale/pt-BR"
import { Button } from "@/components/Button"

interface TripConfirmationProps {
  params: {
    tripId: string
  }
  searchParams: {
    startDate: string
    endDate: string
    guests: number
  }
}

export default function TripConfirmation({ params, searchParams }: TripConfirmationProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [trip, setTrip] = useState<Trip | null>(null)
  const [totalPrice, setTotalPrice] = useState(0)

  const router = useRouter()
  const { status } = useSession()

  useEffect(() => {
    const fetchTrip = async () => {
      const response = await fetch('http://localhost:3000/api/trips/check', {
        method: 'POST',
        body: JSON.stringify({
          tripId: params.tripId,
          startDate: new Date(searchParams.startDate),
          endDate: new Date(searchParams.endDate)
        })
      }).then(res => res.json())

      setTrip(response.trip)
      setTotalPrice(response.totalPrice)
      setIsLoading(false)
    }

    if (status === 'unauthenticated') {
      return router.push('/')
    }
    
    if (status === 'authenticated') {
      fetchTrip()
    }
  }, [status])

  if (isLoading) {
    return <p>Carregando informações...</p>
  }

  if (!trip) {
    return <p>Acomodação não encontrada</p>
  }

  const startDate = new Date(searchParams.startDate)
  const endDate = new Date(searchParams.endDate)

  return (
    <main className="container mx-auto p-5">
      <h1 className="font-semibold text-xl text-primaryDarker">Sua viagem</h1>
      {/* CARD */}
      <div className="flex flex-col p-5 mt-5 border shadow-lg rounded-lg gap-3">
        <div className="flex items-center gap-3 pb-5 border-b">
          <Image
            src={trip.coverImage}
            width={106}
            quality={100}
            height={124}
            alt={trip.name}
            className="object-fill w-full h-auto max-h-[400px] max-w-[556px] rounded-lg"
          />
          <div className="flex flex-col w-full">
            <h2 className="text-xl text-primaryDarker font-semibold">{trip.name}</h2>
            <div className="flex items-center gap-1">
              <ReactCountryFlag countryCode={trip.countryCode} svg />
              <p className="text-xs text-dark underline">{trip.location}</p>
            </div>
          </div>
        </div>
        <h3 className="font-semibold text-md text-primaryDarker mt-1">Informações sobre o preço</h3>
        <div className="flex justify-between mt-1">
          <p className="text-sm text-primaryDarker">Total</p>
          <p className="font-semibold text-sm text-primaryDarker">R${totalPrice}</p>
        </div>
      </div>
      {/* INFOS */}
      <div className="flex flex-col mt-5">
        <h3 className="font-semibold text-primaryDarker">Data</h3>
        <div className="flex items-center gap-1 mt-1">
          <p>
            {format(startDate, "dd", {
              locale: ptBR
            })}
            {' - '}
            {format(endDate, "dd 'de' MMMM", {
              locale: ptBR
            })}
          </p>
        </div>

        <h3 className="font-semibold text-primaryDarker">Hóspedes</h3>
        <p>{searchParams.guests} hóspede(s)</p>

        <Button className="mt-5">Finalizar Compra</Button>
      </div>
    </main>
  )
}