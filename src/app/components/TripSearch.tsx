"use client";

import { Controller, useForm } from "react-hook-form";
import { Button } from "../../components/Button";
import { CurrencyInput } from "../../components/CurrencyInput";
import DatePicker from "../../components/DatePicker";
import Input from "../../components/Input";
import { useRouter } from "next/navigation";

interface TripSearchForm {
  text: string;
  startDate: Date | null;
  budget: string | undefined;
}

export function TripSearch() {
  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<TripSearchForm>();
  const router = useRouter();

  function onSubmit({ text, startDate, budget }: TripSearchForm) {
    router.push(
      `/trips/search?text=${text}&startDate=${startDate?.toISOString()}&budget=${budget}`
    );
  }

  return (
    <div className="container mx-auto bg-search bg-cover bg-center bg-no-repeat p-5 lg:py-28">
      <h1 className="text-center text-xl lg:text-2xl font-semibold text-primaryDarker">
        Encontre sua próxima{" "}
        <strong className="font-semibold text-primary">viagem!</strong>
      </h1>
      <div className="mt-5 lg:mt-12 flex flex-col gap-4 lg:flex-row lg:max-w-[948px] lg:mx-auto lg:p-4 lg:bg-primary lg:bg-opacity-20 lg:rounded-lg">
        <Input
          placeholder="Onde você quer ir?"
          {...register("text", {
            required: {
              value: true,
              message: "Um destino é obrigatório",
            },
          })}
          error={!!errors.text}
          errorMessage={errors.text?.message}
        />

        <div className="flex gap-4 lg:w-full">
          <Controller
            name="startDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                placeholderText="Data de início"
                onChange={field.onChange}
                className="w-full"
                minDate={new Date()}
                selected={field.value}
              />
            )}
          />
          <Controller
            name="budget"
            control={control}
            render={({ field }) => (
              <CurrencyInput
                placeholder="Orçamento"
                onValueChange={field.onChange}
                value={field.value || ""}
                onBlur={field.onBlur}
              />
            )}
          />
        </div>
        <Button type="submit" onClick={() => handleSubmit(onSubmit)()} className="lg:w-1/2">
          Buscar
        </Button>
      </div>
    </div>
  );
}
