import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(request: Request, { params: { userId } }: { params: { userId: string } }) {
  if (!userId) {
    return NextResponse.json({
      error: {
        message: 'USERID_NOT_FOUND'
      }
    }, { status: 400 })
  }

  const reservations = await prisma.tripReservation.findMany({
    where: {
      userId
    },
    include: {
      trip: true
    }
  })

  if (!reservations) {
    return NextResponse.json([], { status: 200 })
  }

  return NextResponse.json(reservations, { status: 200 })
}