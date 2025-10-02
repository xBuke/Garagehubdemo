import { NextResponse } from 'next/server';
import { Lead } from '@/lib/types';
import leadsData from '@/data/leads.json';

export async function GET() {
  return NextResponse.json(leadsData as Lead[]);
}

export async function POST(request: Request) {
  const body = await request.json();
  const newLead: Lead = {
    id: `L-${Date.now()}`,
    ...body,
    date: new Date().toISOString(),
  };
  
  // U stvarnoj aplikaciji bi se ovo spremilo u bazu podataka
  const updatedLeads = [...leadsData, newLead];
  
  return NextResponse.json(newLead, { status: 201 });
}
