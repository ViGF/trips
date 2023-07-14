"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Prisma } from "@prisma/client";
import { UserReservationItem } from "./components/UserReservationItem";
import { Button } from "@/components/Button";
import Link from "next/link";

export default function MyTrips() {
  const [reservations, setReservations] = useState<
    Prisma.TripReservationGetPayload<{
      include: { trip: true };
    }>[]
  >([]);

  const router = useRouter();
  const { status, data } = useSession();

  const fetchReservations = async () => {
    const response = await fetch(
      `/api/trips/reservation/user/${(data?.user as any).id}`
    ).then((res) => res.json());

    setReservations(response);
  };

  useEffect(() => {
    if (status === "unauthenticated") {
      return router.push("/api/auth/signin");
    }

    if (status === "loading") {
      return;
    }

    fetchReservations();
  }, [status]);

  return (
    <main className="container mx-auto p-5">
      <h1 className="text-xl font-semibold text-primaryDarker lg:text-2xl">
        Minhas viagens
      </h1>
      {reservations.length > 0 ? (
        <div className="flex flex-col lg:grid lg:grid-cols-3 lg:gap-12">
          {reservations.map((reservation) => (
            <UserReservationItem
              key={reservation.id}
              reservation={reservation}
              fetchReservations={fetchReservations}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center">
          <p className="mt-2 text-center font-medium text-primaryDarker">
            Você ainda não possui reservas
          </p>
          <Link href="/">
            <Button className="mt-2 w-full lg:min-w-[20rem]">Fazer reserva</Button>
          </Link>
        </div>
      )}
    </main>
  );
}
