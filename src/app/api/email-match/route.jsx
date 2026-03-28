import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(request) {
    // 1. Extract the data from the request body
    const email = await request.json();
   
  const MatchedCustomer = await prisma.customer.findFirst({
    select:{
        customer_id:true,
        email:true,
    },
    where: { email: email },
  })
  return NextResponse.json(MatchedCustomer)
}
