import { Trip } from "@prisma/client"
import Image from "next/image"
import ReactCountryFlag from "react-country-flag"

interface TripItemProps {
  trip: Trip
}

export function TripItem({ trip }: TripItemProps) {
  return (
    <div className="flex flex-col">
      <Image
        src={trip.coverImage}
        width={280}
        height={280}
        alt={trip.name}
        className="rounded-lg shadow-sm w-auto h-64"
      />
      <h3 className="text-sm text-primaryDarker font-medium mt-1">{trip.name}</h3>
      <div className="flex items-center gap-2 mb-1">
        <ReactCountryFlag countryCode={trip.countryCode} svg />
        <p className="text-xs text-grayLighter">{trip.location}</p>
      </div>

      <p className="text-xs text-grayLighter">
        <span className="text-primary font-medium">{trip.pricePerDay.toString()}</span> por dia
      </p>
    </div>
  )
}