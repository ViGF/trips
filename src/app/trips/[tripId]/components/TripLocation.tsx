import { Button } from "@/components/Button"
import Image from "next/image"

interface TripLocationProps {
  location: string
  locationDescription: string
}

export function TripLocation({ location, locationDescription }: TripLocationProps) {
  return (
    <div className="flex flex-col px-5 pb-5">
      <h2 className="font-semibold text-primaryDarker mb-5">Localização</h2>
      <Image
        src='/map-mobile.png'
        width={353}
        height={246}
        quality={100}
        alt={location}
        className="shadow-sm rounded-lg"
      />
      <h3 className="text-primaryDarker text-sm font-semibold mt-5 mb-1">{location}</h3>
      <p className="text-xs text-primaryDarker leading-5 mb-5">{locationDescription}</p>
      <Button className="w-full" variant="outlined">Ver no Google Maps</Button>
    </div>
  )
}