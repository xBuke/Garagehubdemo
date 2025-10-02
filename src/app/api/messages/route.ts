import { NextResponse } from 'next/server';
import { Message } from '@/lib/types';
import messagesData from '@/data/messages.json';

export async function GET() {
  return NextResponse.json(messagesData as Message[]);
}

export async function POST(request: Request) {
  const body = await request.json();
  const newMessage: Message = {
    id: `M-${Date.now()}`,
    ...body,
    createdAt: new Date().toISOString(),
  };
  
  const updatedMessages = [...messagesData, newMessage];
  
  return NextResponse.json(newMessage, { status: 201 });
}
