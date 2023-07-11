import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const req = await request.json()

  const { startDate, endDate, userId, tripId, totalPaid, guests } = req

  const trip = await prisma.trip.findUnique({
    where: {
      id: tripId
    }
  })

  if (!trip) {
    return NextResponse.json({
      error: {
        message: 'TRIP_NOT_FOUND'
      }
    }, { status: 400 })
  }

  await prisma.tripReservation.create({
    data: {
      startDate,
      endDate,
      tripId,
      userId,
      totalPaid,
      guests
    }
  })

  return NextResponse.json({
    sucess: true
  }, { status: 201 })
}