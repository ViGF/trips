import Image from "next/image"

interface TripHighlightsProps {
  highlights: string[]
}

export function TripHighlights({ highlights }: TripHighlightsProps) {
  return (
    <div className="flex flex-col px-5 pb-5 lg:pl-0 lg:mt-12">
      <h2 className="font-semibold text-primaryDarker mb-2 lg:text-xl">Destaques</h2>
      <div className="flex flex-wrap gap-y-3 lg:mt-5">
        {highlights.map((highlight) => (
          <div key={highlight} className="flex items-center gap-2 w-1/2 lg:gap-3">
            <Image
              src='/check-icon.svg'
              width={15}
              height={15}
              alt={highlight}
            />
            <p className="text-dark text-xs lg:text-base">{highlight}</p>
          </div>
        ))}
      </div>
    </div>
  )
}