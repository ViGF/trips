import { getServerSession } from "next-auth";
import {  } from "next-auth/react";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { authOptions } from "../auth/[...nextauth]/route";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2022-11-15'
})

export async function POST(request: Request) {
  const req = await request.json()
  const userSession = await getServerSession(authOptions)

  const { totalPrice, name, description, coverImage, startDate, endDate, guests, tripId } = req

  const session = await stripe.checkout.sessions.create({
    success_url: process.env.HOST_URL!,
    metadata: {
      startDate,
      endDate,
      guests,
      tripId,
      totalPrice,
      userId: (userSession?.user as any).id
    },
    line_items: [
      {
        price_data: {
          currency: 'brl',
          unit_amount: totalPrice * 100,
          product_data: {
            name,
            description,
            images: [coverImage]
          }
        },
        quantity: 1
      }
    ],
    mode: 'payment'
  })

  return NextResponse.json({ sessionId: session.id }, { status: 200 })
}