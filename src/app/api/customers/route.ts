import { NextResponse } from 'next/server';
import { Customer } from '@/lib/types';
import customersData from '@/data/customers.json';

export async function GET() {
  return NextResponse.json(customersData as Customer[]);
}
