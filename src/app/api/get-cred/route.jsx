import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  const user = await prisma.customer.findMany({
    select: {
      first_name: true, // ✅ safe
      last_name: true,
      password: true,
      customer_id:true,
    },
    orderBy: {
    customer_id: 'asc',
    },
  })

  return NextResponse.json(user)
}
