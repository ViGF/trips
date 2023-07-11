'use client'

import { Button } from "@/components/Button";
import DatePicker from "@/components/DatePicker";
import differenceInDays from 'date-fns/differenceInDays'
import Input from "@/components/Input";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

interface TripReservationProps {
  tripStartDate: Date
  tripEndDate: Date
  maxGuests: number
  pricePerDay: number
  tripId: string
}

interface TripReservationForm {
  guests: number
  startDate: Date | null
  endDate: Date | null
}

export function TripReservation({ tripStartDate, tripEndDate, maxGuests, pricePerDay, tripId }: TripReservationProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
    setError
  } = useForm<TripReservationForm>()

  const router = useRouter()

  async function onSubmit({ startDate, endDate, guests}: TripReservationForm) {
    const response = await fetch('/api/trips/check', {
      method: 'POST',
      body: JSON.stringify({
        startDate,
        endDate,
        tripId
      })
    }).then(res => res.json())

    if (response?.error?.message === 'TRIP_ALREADY_RESERVED') {
      setError('startDate', {
        type: 'validate',
        message: 'Esta data já está reservada'
      })

      return setError('endDate', {
        type: 'validate',
        message: 'Esta data já está reservada'
      })
    }

    if (response?.error?.message === 'INVALID_START_DATE') {
      return setError('startDate', {
        type: 'validate',
        message: 'Data inválida'
      })
    }

    if (response?.error?.message === 'INVALID_END_DATE') {
      return setError('endDate', {
        type: 'validate',
        message: 'Data inválida'
      })
    }

    router.push(`${tripId}/confirmation?startDate=${startDate?.toISOString()}&endDate=${endDate?.toISOString()}&guests=${guests}`)
  }

  const startDate = watch('startDate')
  const endDate = watch('endDate')

  return (
    <div className="flex flex-col px-5">
      <div className="flex gap-2">
        <Controller
          name='startDate'
          rules={{
            required: {
              value: true,
              message: 'Data inicial é obrigatória'
            }
          }}
          control={control}
          render={({ field }) => (
            <DatePicker
              placeholderText="Data de início"
              onChange={field.onChange}
              selected={field.value}
              className="w-full"
              error={!!errors?.startDate}
              errorMessage={errors.startDate?.message}
              minDate={tripStartDate}
            />
          )}
        />
        <Controller
          name='endDate'
          rules={{
            required: {
              value: true,
              message: 'Data final é obrigatória'
            }
          }}
          control={control}
          render={({ field }) => (
            <DatePicker
              placeholderText="Data final"
              onChange={field.onChange}
              selected={field.value}
              className="w-full"
              error={!!errors?.endDate}
              errorMessage={errors.endDate?.message}
              minDate={startDate ?? tripStartDate}
              endDate={tripEndDate}
            />
          )}
        />
      </div>

      <Input
        placeholder={`Num. de hóspedes (Máx. ${maxGuests})`}
        className="mt-3"
        type="number"
        max={maxGuests}
        min={1}
        {...register('guests', {
          required: {
            value: true,
            message: 'Número de hóspedes é obrigatório'
          },
          max: {
            value: maxGuests,
            message: `Número de hóspedes não pode ser maior que ${maxGuests}.`
          }
        })}
        error={!!errors?.guests}
        errorMessage={errors.guests?.message}
      />
      <div className="flex justify-between mt-3">
        <p className="font-medium text-sm text-primaryDarker">Total {
          startDate && endDate ? (
            `(${differenceInDays(endDate, startDate)} noite(s))`
          ) : null
        }</p>
        <p className="font-medium text-sm text-primaryDarker">R${
          startDate && endDate ? (
            differenceInDays(endDate, startDate) * (+pricePerDay)
          ) : '0'
        }</p>
      </div>
      <div className="pb-[2.5rem] mb-[2.5rem] border-b border-b-grayLighter w-full">
        <Button className="mt-3 w-full" onClick={() => handleSubmit(onSubmit)()}>Reservar agora</Button>
      </div>
    </div>
  )
}