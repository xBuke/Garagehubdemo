import { NextResponse } from 'next/server';
import { Booking } from '@/lib/types';
import bookingsData from '@/data/bookings.json';

export async function GET() {
  return NextResponse.json(bookingsData as Booking[]);
}

export async function POST(request: Request) {
  const body = await request.json();
  const newBooking: Booking = {
    id: `B-${Date.now()}`,
    ...body,
  };
  
  const updatedBookings = [...bookingsData, newBooking];
  
  return NextResponse.json(newBooking, { status: 201 });
}
