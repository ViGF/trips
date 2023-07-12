"use client";

import { TripItem } from "@/components/TripItem";
import { Trip } from "@prisma/client";
import { useEffect, useState } from "react";

interface TripProps {
  searchParams: {
    text: string;
    startDate?: string;
    budget?: string;
  };
}

export default async function Trip({ searchParams }: TripProps) {
  const [trips, setTrips] = useState<Trip[]>([]);

  useEffect(() => {
    const getTrips = async () => {
      const response = await fetch(
        `/api/trips/search?text=${searchParams.text}&startDate=${searchParams.startDate}&budget=${searchParams.budget}`
      ).then((res) => res.json());

      setTrips(response);
    };

    getTrips();
  }, []);

  return (
    <div className="container mx-auto flex-col items-center p-5">
      <h1 className="text-xl font-semibold text-primaryDarker">
        Hospedagens encontradas
      </h1>
      <p className="font-medium text-dark">
        {trips.length > 0
          ?"Listamos as melhores hospedagens para você"
          : "Não encontramos nenhuma acomodação"
        }
      </p>
      <div className="mt-2 flex flex-col gap-4">
        {trips.map((trip) => (
          <TripItem key={trip.id} trip={trip} />
        ))}
      </div>
    </div>
  );
}
