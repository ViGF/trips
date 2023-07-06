import { Trip } from "@prisma/client";
import Image from "next/image";
import ReactCountryFlag from "react-country-flag";

interface TripHeaderProps {
  trip: Trip
}

export function TripHeader({ trip }: TripHeaderProps) {
  return (
    <main>
      <Image
          src={trip.coverImage}
          width={556}
          height={400}
          alt={trip.name}
          className="object-fill w-auto h-auto max-h-[400px] max-w-[556px]"
        />
        <div className="flex flex-col p-5">
          <h1 className="font-semibold text-xl text-primaryDarker">{trip.name}</h1>
          <div className="flex items-center gap-2 mb-1">
            <ReactCountryFlag countryCode={trip.countryCode} svg />
            <p className="text-xs text-dark underline">{trip.location}</p>
          </div>
          <p className="text-xs text-dark">
            <span className="text-primary font-medium">R${trip.pricePerDay.toString()}</span> por noite
          </p>
        </div>
    </main>
  )
}