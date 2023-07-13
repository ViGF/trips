"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Trip } from "@prisma/client";
import ReactCountryFlag from "react-country-flag";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { Button } from "@/components/Button";
import { toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";
interface TripConfirmationProps {
  params: {
    tripId: string;
  };
  searchParams: {
    startDate: string;
    endDate: string;
    guests: number;
  };
}

export default function TripConfirmation({
  params,
  searchParams,
}: TripConfirmationProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [trip, setTrip] = useState<Trip | null>(null);
  const [totalPrice, setTotalPrice] = useState(0);

  const router = useRouter();
  const { status } = useSession();

  async function handleBuyClick() {
    const response = await fetch("/api/payment", {
      method: "POST",
      body: JSON.stringify({
        tripId: params.tripId,
        startDate: searchParams.startDate,
        endDate: searchParams.endDate,
        guests: +searchParams.guests,
        totalPrice,
        coverImage: trip?.coverImage,
        name: trip?.name,
        description: trip?.description
      }),
    }).then((res) => res.json());

    if (!response?.sessionId) {
      return toast.error("Não foi possível finalizar a compra", {
        position: "bottom-right",
      });
    }

    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_KEY as string
    );

    await stripe?.redirectToCheckout({
      sessionId: response.sessionId,
    });

    toast.success("Reserva realizada com sucesso", {
      position: "bottom-right",
    });
  }

  useEffect(() => {
    const fetchTrip = async () => {
      const response = await fetch("/api/trips/check", {
        method: "POST",
        body: JSON.stringify({
          tripId: params.tripId,
          startDate: new Date(searchParams.startDate),
          endDate: new Date(searchParams.endDate),
        }),
      }).then((res) => res.json());

      if (response?.error) {
        return router.push("/");
      }

      setTrip(response.trip);
      setTotalPrice(response.totalPrice);
      setIsLoading(false);
    };

    if (status === "unauthenticated") {
      return router.push("/");
    }

    if (status === "authenticated") {
      fetchTrip();
    }
  }, [status]);

  if (isLoading) {
    return <p>Carregando informações...</p>;
  }

  if (!trip) {
    return <p>Acomodação não encontrada</p>;
  }

  const startDate = new Date(searchParams.startDate);
  const endDate = new Date(searchParams.endDate);

  return (
    <main className="container mx-auto p-5">
      <h1 className="text-xl font-semibold text-primaryDarker">Sua viagem</h1>
      {/* CARD */}
      <div className="mt-5 flex flex-col gap-3 rounded-lg border p-5 shadow-lg">
        <div className="flex items-center gap-3 border-b pb-5">
          <Image
            src={trip.coverImage}
            width={106}
            quality={100}
            height={124}
            alt={trip.name}
            className="h-auto max-h-[400px] w-full max-w-[556px] rounded-lg object-fill"
          />
          <div className="flex w-full flex-col">
            <h2 className="text-xl font-semibold text-primaryDarker">
              {trip.name}
            </h2>
            <div className="flex items-center gap-1">
              <ReactCountryFlag countryCode={trip.countryCode} svg />
              <p className="text-xs text-dark underline">{trip.location}</p>
            </div>
          </div>
        </div>
        <h3 className="text-md mt-1 font-semibold text-primaryDarker">
          Informações sobre o preço
        </h3>
        <div className="mt-1 flex justify-between">
          <p className="text-sm text-primaryDarker">Total</p>
          <p className="text-sm font-semibold text-primaryDarker">
            R${totalPrice}
          </p>
        </div>
      </div>
      {/* INFOS */}
      <div className="mt-5 flex flex-col">
        <h3 className="font-semibold text-primaryDarker">Data</h3>
        <div className="mt-1 flex items-center gap-1">
          <p>
            {format(startDate, "dd", {
              locale: ptBR,
            })}
            {" - "}
            {format(endDate, "dd 'de' MMMM", {
              locale: ptBR,
            })}
          </p>
        </div>

        <h3 className="font-semibold text-primaryDarker">Hóspedes</h3>
        <p>{searchParams.guests} hóspede(s)</p>

        <Button className="mt-5" onClick={handleBuyClick}>
          Finalizar Compra
        </Button>
      </div>
    </main>
  );
}
