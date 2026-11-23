import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST() {
  return NextResponse.json(
    { error: 'Chat is temporarily unavailable' },
    {
      status: 503,
      headers: { 'Cache-Control': 'no-store' },
    }
  );
}
