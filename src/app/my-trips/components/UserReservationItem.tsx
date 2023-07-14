import Image from "next/image";
import ReactCountryFlag from "react-country-flag";
import { format } from "date-fns";
import { Prisma } from "@prisma/client";
import { ptBR } from "date-fns/locale";
import { Button } from "@/components/Button";
import { toast } from "react-toastify";

interface UserReservationItemProps {
  reservation: Prisma.TripReservationGetPayload<{
    include: { trip: true };
  }>;
  fetchReservations: () => void;
}

export function UserReservationItem({
  reservation,
  fetchReservations,
}: UserReservationItemProps) {
  async function handleDeleteClick() {
    const response = await fetch(`/api/trips/reservation/${reservation.id}`, {
      method: "DELETE",
    })
      .then((res) => res?.json())
      .catch(() => {
        return toast.error("Não foi possível cancelar a reserva", {
          position: "bottom-right",
        });
      });

    if (response.id) {
      toast.success("A reserva foi cancelada com sucesso", {
        position: "bottom-right",
      });

      fetchReservations();
    }
  }

  return (
    <div className="mt-5 flex flex-col gap-3 rounded-lg border p-5 shadow-lg">
      <div className="flex items-center gap-3 border-b pb-5">
        <Image
          src={reservation.trip.coverImage}
          width={106}
          quality={100}
          height={124}
          alt={reservation.trip.name}
          className="h-auto max-h-[400px] w-full max-w-[556px] rounded-lg object-fill"
        />
        <div className="flex w-full flex-col">
          <h2 className="text-xl text-primaryDarker">
            {reservation.trip.name}
          </h2>
          <div className="flex items-center gap-1">
            <ReactCountryFlag countryCode={reservation.trip.countryCode} svg />
            <p className="text-xs text-dark underline">
              {reservation.trip.location}
            </p>
          </div>
        </div>
      </div>
      <div className="flex lg:flex-col items-center lg:items-start justify-between pb-1">
        <div>
          <h2 className="text-md font-semibold text-primaryDarker py-1">Sobre a viagem</h2>
          <h3 className="text-sm text-primaryDarker">Data</h3>
          <div className="mt-1 flex items-center gap-1">
            <p className="text-sm">
              {format(new Date(reservation.startDate), "dd", {
                locale: ptBR,
              })}
              {" - "}
              {format(new Date(reservation.endDate), "dd 'de' MMMM", {
                locale: ptBR,
              })}
            </p>
          </div>
        </div>
        <div>
          <h3 className="text-sm text-primaryDarker lg:mt-4">Hóspedes</h3>
          <p className="text-sm">{reservation.guests} hóspede(s)</p>
        </div>
      </div>
      <div className="mb-5 border-t pt-3">
        <h3 className="mt-1 text-sm font-semibold text-primaryDarker">
          Informações sobre o preço
        </h3>
        <div className="mt-1 flex justify-between">
          <p className="text-sm text-primaryDarker">Total</p>
          <p className="text-sm font-medium text-primaryDarker">
            R${+reservation.totalPaid}
          </p>
        </div>
      </div>
      <Button variant="danger" onClick={handleDeleteClick}>
        Cancelar
      </Button>
    </div>
  );
}
