import { prisma } from "@/lib/prisma";
import { isBefore, isEqual } from "date-fns";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const req = await request.json()

  const trip = await prisma.trip.findUniqueOrThrow({
    where: {
      id: req.tripId
    }
  })

  if (!trip) {
    return NextResponse.json({
      error: {
        message: 'TRIP_NOT_FOUND'
      }
    }, { status: 400 })
  }

  if (isBefore(new Date(req.startDate), new Date(trip.startDate))) {
    return NextResponse.json({
      error: {
        message: 'INVALID_START_DATE'
      }
    }, { status: 400 })
  }

  if (isBefore(new Date(trip.endDate), new Date(req.endDate))) {
    return NextResponse.json({
      error: {
        message: 'INVALID_END_DATE'
      }
    }, { status: 400 })
  }

  if (isBefore(new Date(req.endDate), new Date(req.startDate)) || isEqual(new Date(req.endDate), new Date(req.startDate))) {
    return NextResponse.json({
      error: {
        message: 'INVALID_END_DATE'
      }
    }, { status: 400 })
  }

  const reservations = await prisma.tripReservation.findMany({
    where: {
      tripId: req.tripId,
      startDate: {
        lte: new Date(req.endDate)
      },
      endDate: {
        gte: new Date(req.startDate)
      }
    }
  })

  if (reservations.length > 0) {
    return NextResponse.json({
      error: {
        message: 'TRIP_ALREADY_RESERVED'
      },
    }, { status: 400 })
  }

  return NextResponse.json({sucess: true}, { status: 200 })
}