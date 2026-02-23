import { NextResponse } from 'next/server';
import { interpretAndQuery } from '@/lib/chatbot-queries';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required.' }, { status: 400 });
    }

    const response = await interpretAndQuery(message);
    
    return NextResponse.json({ response });
  } catch (error: any) {
    console.error('Error in chatbot:', error);
    return NextResponse.json({ error: error.message || 'Failed to process chatbot request' }, { status: 500 });
  }
}
