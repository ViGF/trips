'use client'

import Image from "next/image";
import { signIn, useSession } from 'next-auth/react'
import { Dropdown } from "./Dropdow";
import Link from "next/link";

export function Header() {
  const { status, data } = useSession()

  function handleLoginClick() {
    signIn()
  }

  return (
    <header className="container mx-auto h-20 flex items-center justify-between px-5">
      <Link href='/'>
        <Image
          src='/logo.png'
          alt="Trips Logo (semelhante a do AirBnb)"
          width={29.8}
          height={32}
        />
      </Link>
      {status === 'unauthenticated' ? (
        <button className="text-primary font-semibold" onClick={handleLoginClick}>Login</button>
      ) : null}
      {status === 'authenticated' && data.user ? (
        <div className="flex items-center gap-5 border-grayLighter border px-2 py-1 rounded-full">
          <Dropdown />
          <Image
            alt={data.user.name!}
            src={data.user.image!}
            width={32}
            height={32}
            className="rounded-full shadow-md"
          />
        </div>
      ) : null}
    </header>
  )
}