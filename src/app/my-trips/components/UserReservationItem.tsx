import Image from "next/image";
import ReactCountryFlag from "react-country-flag";
import { format } from "date-fns";
import { Prisma } from "@prisma/client";
import { ptBR } from "date-fns/locale";
import { Button } from "@/components/Button";
import { toast } from "react-toastify";

interface UserReservationItemProps {
  reservation: Prisma.TripReservationGetPayload<{
    include: { trip: true }
  }>
  fetchReservations: () => void
}

export function UserReservationItem({ reservation, fetchReservations }: UserReservationItemProps) {
  async function handleDeleteClick() {
    const response = await fetch(`/api/trips/reservation/${reservation.id}`, {
      method: 'DELETE'
    })
      .then(res => res?.json())
      .catch(() => {
        return toast.error("Não foi possível cancelar a reserva", {
          position: 'bottom-right'
        })
      })

    if (response.id) {
      toast.success("A reserva foi cancelada com sucesso", {
        position: 'bottom-right'
      })

      fetchReservations()
    }
  }

  return (
    <div className="flex flex-col p-5 mt-5 border shadow-lg rounded-lg gap-3">
      <div className="flex items-center gap-3 pb-5 border-b">
        <Image
          src={reservation.trip.coverImage}
          width={106}
          quality={100}
          height={124}
          alt={reservation.trip.name}
          className="object-fill w-full h-auto max-h-[400px] max-w-[556px] rounded-lg"
        />
        <div className="flex flex-col w-full">
          <h2 className="text-xl text-primaryDarker">{reservation.trip.name}</h2>
          <div className="flex items-center gap-1">
            <ReactCountryFlag countryCode={reservation.trip.countryCode} svg />
            <p className="text-xs text-dark underline">{reservation.trip.location}</p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between pb-1">
        <div>
          <h3 className="text-primaryDarker text-sm">Data</h3>
          <div className="flex items-center gap-1 mt-1">
            <p className="text-sm">
              {format(new Date(reservation.startDate), "dd", {
                locale: ptBR
              })}
              {' - '}
              {format(new Date(reservation.endDate), "dd 'de' MMMM", {
                locale: ptBR
              })}
            </p>
          </div>
        </div>
        <div>
          <h3 className="text-primaryDarker text-sm">Hóspedes</h3>
          <p className="text-sm">{reservation.guests} hóspede(s)</p>
        </div>
      </div>
      <div className="pt-3 border-t mb-5">
        <h3 className="text-sm text-primaryDarker mt-1">Informações sobre o preço</h3>
        <div className="flex justify-between mt-1">
          <p className="text-sm text-primaryDarker">Total</p>
          <p className="text-sm font-medium text-primaryDarker">R${+reservation.totalPaid}</p>
        </div>
      </div>
      <Button variant="danger" onClick={handleDeleteClick}>Cancelar</Button>
    </div>
  )
}