'use client'

import { Button } from "./Button";
import { CurrencyInput } from "./CurrencyInput";
import DatePicker from "./DatePicker";
import Input from "./Input";

export function TripSearch() {
  return (
    <div className="container mx-auto p-5">
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
      </div>
    </div>
  )
}