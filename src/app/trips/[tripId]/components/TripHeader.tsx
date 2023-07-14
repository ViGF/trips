"use client";

import { useState } from "react";
import { Trip } from "@prisma/client";
import Image from "next/image";
import ReactCountryFlag from "react-country-flag";

interface TripHeaderProps {
  trip: Trip;
}

export function TripHeader({ trip }: TripHeaderProps) {
  const [actualCover, setActualCover] = useState(trip.coverImage);

  return (
    <main className="flex flex-col">
      <div className="lg:order-2">
        <Image
          src={actualCover}
          width={556}
          height={400}
          alt={trip.name}
          className="h-auto w-full max-w-[556px] object-fill lg:hidden"
        />
        <div className="mx-auto w-max gap-2 overflow-hidden rounded-2xl justify-center hidden lg:flex">
          <Image
            src={actualCover}
            width={556}
            height={400}
            alt={trip.name}
            className="h-auto max-h-[400px] w-full max-w-[556px] object-fill"
          />
          <div className="flex max-w-[556px] flex-row flex-wrap gap-2">
            {trip.imagesUrl.map((imageUrl) => (
              <Image
                src={imageUrl}
                key={imageUrl}
                width={556}
                height={400}
                alt={trip.name}
                onMouseEnter={() => setActualCover(imageUrl)}
                className="h-[196px] w-[274px] cursor-pointer object-fill"
              />
            ))}
          </div>
        </div>
      </div>
      <div
        onMouseEnter={() => setActualCover(trip.coverImage)}
        className="flex flex-col p-5 h-max lg:order-1 lg:pl-0"
      >
        <h1 className="text-xl font-semibold text-primaryDarker lg:text-3xl">
          {trip.name}
        </h1>
        <div className="mb-1 flex items-center gap-2">
          <ReactCountryFlag countryCode={trip.countryCode} svg />
          <p className="text-xs text-dark underline lg:text-base">{trip.location}</p>
        </div>
        <p className="text-xs text-dark lg:hidden">
          <span className="font-medium text-primary">
            R${trip.pricePerDay.toString()}
          </span>{" "}
          por noite
        </p>
      </div>
    </main>
  );
}
