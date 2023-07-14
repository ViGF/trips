import { Decimal } from "@prisma/client/runtime";
import Image from "next/image"
import Link from "next/link"
import ReactCountryFlag from "react-country-flag"

interface TripItemProps {
  trip: {
    id: string;
    coverImage: string;
    name: string;
    countryCode: string;
    location: string;
    pricePerDay: Decimal;
  }
}

export function TripItem({ trip }: TripItemProps) {
  return (
    <Link href={`/trips/${trip.id}`}>
      <div className="flex flex-col">
        <Image
          src={trip.coverImage}
          width={384}
          height={256}
          alt={trip.name}
          quality={100}
          className="rounded-lg object-fill shadow-sm w-auto h-auto max-h-[256px]"
        />
        <h3 className="text-sm text-primaryDarker font-medium mt-1">{trip.name}</h3>
        <div className="flex items-center gap-2 mb-1">
          <ReactCountryFlag countryCode={trip.countryCode} svg />
          <p className="text-xs text-dark">{trip.location}</p>
        </div>

        <p className="text-xs text-dark">
          <span className="text-primary font-medium">R${trip.pricePerDay.toString()}</span> por dia
        </p>
      </div>
    </Link>
  )
}