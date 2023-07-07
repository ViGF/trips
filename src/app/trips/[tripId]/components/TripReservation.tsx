'use client'

import { Button } from "@/components/Button";
import DatePicker from "@/components/DatePicker";
import Input from "@/components/Input";
import { Trip } from "@prisma/client";

interface TripReservationProps {
  trip: Trip
}

export function TripReservation({ trip }: TripReservationProps) {
  return (
    <div className="flex flex-col px-5">
      <div className="flex gap-2">
        <DatePicker placeholderText="Data de início" onChange={() => { }} className="w-full" />
        <DatePicker placeholderText="Data final" onChange={() => { }} className="w-full" />
      </div>

      <Input
        placeholder={`Num. de hóspedes (Máx. ${trip.maxGuests})`}
        className="mt-3"
        type="number"
        max={trip.maxGuests}
      />
      <div className="flex justify-between mt-3">
        <p className="font-medium text-sm text-primaryDarker">Total (7 noites)</p>
        <p className="font-medium text-sm text-primaryDarker">R$2500</p>
      </div>
      <div className="pb-[2.5rem] mb-[2.5rem] border-b border-b-grayLighter w-full">
        <Button className="mt-3 w-full">Reservar agora</Button>
      </div>
    </div>
  )
}