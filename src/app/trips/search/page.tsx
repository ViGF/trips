"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation'
import { Trip } from "@prisma/client";
import { TripItem } from "@/components/TripItem";

export default async function Trip() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const searchParams = useSearchParams()
 
  const text = searchParams.get('text')
  const startDate = searchParams.get('startDate')
  const budget = searchParams.get('budget')

  useEffect(() => {
    console.log(searchParams)
    const getTrips = async () => {
      const response = await fetch(
        `/api/trips/search?text=${text}&startDate=${startDate}&budget=${budget}`
      ).then((res) => res.json());

      setTrips(response);
    };

    getTrips();
  }, [searchParams]);

  return (
    <div className="container mx-auto flex-col items-center p-5">
      <h1 className="text-xl font-semibold text-primaryDarker lg:text-3xl">
        Hospedagens encontradas
      </h1>
      <p className="font-medium text-dark lg:mt-6">
        {trips.length > 0
          ? "Listamos as melhores hospedagens para você"
          : "Não encontramos nenhuma acomodação"}
      </p>
      <div className="mt-2 flex flex-col gap-4 lg:mt-6 lg:grid lg:grid-cols-4 lg:gap-10 lg:pb-6">
        {trips.map((trip) => (
          <TripItem key={trip.id} trip={trip} />
        ))}
      </div>
    </div>
  );
}
