import Image from "next/image";
import { CategoryDivider } from "./CategoryDivider";
import Link from "next/link";

export function QuickSearch() {
  return (
    <div className="container mx-auto p-5">
      <CategoryDivider text="Tente pesquisar por" />
      <div className="mt-4 flex w-full justify-between lg:justify-center lg:gap-40 lg:mt-10">
        <Link
          href="/trips/search?text=hotel"
          className="flex flex-col items-center gap-1"
        >
          <Image
            src="/hotel-icon.png"
            width={25}
            height={25}
            alt="Ícone de fachada de hotel"
          />
          <p className="text-sm lg:text-base text-dark">Hotel</p>
        </Link>
        <Link
          href="/trips/search?text=chalé"
          className="flex flex-col items-center gap-1"
        >
          <Image
            src="/cottage-icon.png"
            width={25}
            height={25}
            alt="Ícone de fachada de chalé"
          />
          <p className="text-sm lg:text-base text-dark">Chalés</p>
        </Link>
        <Link
          href="/trips/search?text=pousada"
          className="flex flex-col items-center gap-1"
        >
          <Image
            src="/inn-icon.png"
            width={25}
            height={25}
            alt="Ícone com uma pequena pousada em morro"
          />
          <p className="text-sm lg:text-base text-dark">Pousadas</p>
        </Link>
        <Link
          href="/trips/search?text=fazenda"
          className="flex flex-col items-center gap-1"
        >
          <Image
            src="/farm-icon.png"
            width={25}
            height={25}
            alt="Ícone com uma casa em uma fazenda"
          />
          <p className="text-sm lg:text-base text-dark">Fazendas</p>
        </Link>
      </div>
    </div>
  );
}
