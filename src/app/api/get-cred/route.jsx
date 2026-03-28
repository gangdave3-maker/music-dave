import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const user = await prisma.customer.findMany({
      select: {
        first_name: true,
        last_name: true,
        password: true,
        customer_id: true,
      },
      orderBy: {
        customer_id: 'asc',
      },
    })

    console.log("✅ SUCCESS:", user)

    return NextResponse.json(user)

  } catch (error) {
    console.error("🔥 PRISMA ERROR:", error)

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}