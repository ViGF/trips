import Image from "next/image";

export function Footer() {
  return (
    <div className="flex flex-col items-center justify-center bg-neutral-100 p-5">
      <Image
        src='/logo.png'
        alt="Trips Logo (semelhante a do AirBnb)"
        width={29.8}
        height={32}
      />
      <p className="text-sm font-medium text-primaryDarker mt-1">Todos os direitos reservados.</p>
    </div>
  )
}