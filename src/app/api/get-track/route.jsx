import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  const tracks = await prisma.track.findMany({
  orderBy: {
    album: {
      title: "asc"
    }
  },
  select: {
    track_id: true,
    name: true,
    composer: true,
    milliseconds: true,
    bytes: true,
    unit_price: true,
    genre: {
      select: {
        name: true
      }
    },
    album: {
      select: {
        title: true,
        artist: {
          select: {
            name: true
          }
        }
      }
    }
  }
});

  return NextResponse.json(tracks)
}
