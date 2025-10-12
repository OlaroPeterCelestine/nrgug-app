import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ 
    message: 'API is working!', 
    timestamp: new Date().toISOString(),
    backend: process.env.BACKEND_URL || 'not set'
  });
}
