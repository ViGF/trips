import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

const generateSearchQuery = (text: string, startDate: string |null, budget: string | null) => {
  let searchQuery: any = {
    OR: [
      {
        name: {
          search: text,
        },
      },
      {
        description: {
          search: text,
        },
      },
      {
        location: {
          search: text,
        },
      },
    ],
    AND: []
  }

  if (startDate !== 'undefined') {
    searchQuery = {
      ...searchQuery,
      AND: [
        ...searchQuery.AND,
        {
          startDate: {
            lte: startDate
          }
        }
      ]
    }
  }

  if (budget !== 'undefined') {
    searchQuery = {
      ...searchQuery,
      AND: [
        ...searchQuery.AND,
        {
          pricePerDay: {
            lte: budget
          }
        }
      ]
    }
  }

  return searchQuery
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const text = searchParams.get('text')
  const startDate = searchParams.get('startDate')
  const budget = searchParams.get('budget')
  
  if (!text) {
    return NextResponse.json({
      error: {
        message: 'MISSING_TEXT_PARAMS'
      }
    }, { status: 400 })
  }

  const result = await prisma.trip.findMany({
    where: generateSearchQuery(text, startDate, budget),
  })

  return NextResponse.json(result, { status: 200 })
}