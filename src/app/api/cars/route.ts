import { NextResponse } from 'next/server';
import { Car } from '@/lib/types';
import carsData from '@/data/cars.json';

export async function GET() {
  return NextResponse.json(carsData as Car[]);
}
