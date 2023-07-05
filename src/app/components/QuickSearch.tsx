import Image from "next/image";
import { CategoryDivider } from "./CategoryDivider";

export function QuickSearch() {
  return (
    <div className="container mx-auto p-5">
      <CategoryDivider text="Tente pesquisar por" />
      <div className="flex w-full justify-between mt-4">
        <div className="flex flex-col items-center gap-1">
          <Image
            src='/hotel-icon.png'
            width={25}
            height={25}
            alt="Ícone de fachada de hotel"
          />
          <p className="text-sm text-dark">Hotel</p>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Image
            src='/cottage-icon.png'
            width={25}
            height={25}
            alt="Ícone de fachada de chalé"
          />
          <p className="text-sm text-dark">Chalés</p>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Image
            src='/inn-icon.png'
            width={25}
            height={25}
            alt="Ícone com uma pequena pousada em morro"
          />
          <p className="text-sm text-dark">Pousadas</p>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Image
            src='/farm-icon.png'
            width={25}
            height={25}
            alt="Ícone com uma casa em uma fazenda"
          />
          <p className="text-sm text-dark">Fazendas</p>
        </div>
      </div>
    </div>
  )
}