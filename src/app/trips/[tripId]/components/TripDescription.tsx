interface TripDescriptionProps {
  description: string
}

export function TripDescription({ description }: TripDescriptionProps) {
  return (
    <div className="flex flex-col px-5 pb-5 lg:pl-0">
      <h2 className="font-semibold text-primaryDarker lg:text-xl">Sobre a viagem</h2>
      <p className="text-xs leading-5 text-primaryDarker mt-1 lg:mt-5 lg:text-sm lg:leading-7">{description}</p>
    </div>
  )
}