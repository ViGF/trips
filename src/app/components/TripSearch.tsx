'use client'

import { Button } from "../../components/Button";
import { CurrencyInput } from "../../components/CurrencyInput";
import DatePicker from "../../components/DatePicker";
import Input from "../../components/Input";

export function TripSearch() {
  return (
    <div className="container mx-auto p-5 bg-search bg-cover bg-center bg-no-repeat">
      <h1
        className="font-semibold text-xl text-primaryDarker text-center"
      >
        Econtre sua próxima <strong className="text-primary font-semibold">viagem!</strong>
      </h1>
      <div className="flex flex-col mt-5 gap-4">
        <Input placeholder="Onde você quer ir?" />

        <div className="flex gap-4">
          <DatePicker placeholderText="Data de ida" onChange={() => { }} className="w-full" />
          <CurrencyInput placeholder="Orçamento" />
        </div>
        <Button>Buscar</Button>
      </div>
    </div>
  )
}