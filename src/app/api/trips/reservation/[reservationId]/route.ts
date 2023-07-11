import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(request: Request,
  { params: { reservationId } }: { params: { reservationId: string } }
) {
  if (!reservationId) {
    return NextResponse.json({
      error: {
        message: 'RESERVATIONID_NOT_FOUND'
      }
    }, { status: 200 })
  }

  const reservation = await prisma.tripReservation.delete({
    where: {
      id: reservationId
    }
  })

  return NextResponse.json(reservation, { status: 200 })
}