import { NextResponse } from 'next/server';

const carsData = [
  {
    "id": "CAR-1",
    "customerId": "C-1",
    "model": "VW Golf 7 1.6 TDI"
  },
  {
    "id": "CAR-2",
    "customerId": "C-2",
    "model": "Skoda Octavia"
  },
  {
    "id": "CAR-3",
    "customerId": "C-3",
    "model": "Honda Civic"
  },
  {
    "id": "CAR-4",
    "customerId": "C-4",
    "model": "Ford Focus"
  }
];

export async function GET() {
  return NextResponse.json(carsData);
}

export async function POST(request: Request) {
  const body = await request.json();
  const newCar = {
    id: `CAR-${Date.now()}`,
    ...body,
  };
  
  return NextResponse.json(newCar, { status: 201 });
}
