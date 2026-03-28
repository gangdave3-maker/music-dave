import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(request) {
    const customer = await request.json()
    
    try{
      const createCustomer = await prisma.customer.create({
        data: {
          email:customer.Email,         
          first_name:customer.FirstName,
          last_name:customer.LastName,
          company:customer.Company,
          password:customer.Password,
          address:customer.Address,
          phone:customer.Phone,
          postal_code:customer.PostalCode,
        },
      })
      return NextResponse.json(createCustomer)
    }catch(err){
      return NextResponse.json(
        { message: `Internal Server Error: \n` + err.message },
        { status: 500 }
      )
    }
}
