import { NextResponse } from 'next/server';
import { Service } from '@/lib/types';
import servicesData from '@/data/services.json';

export async function GET() {
  return NextResponse.json(servicesData as Service[]);
}
