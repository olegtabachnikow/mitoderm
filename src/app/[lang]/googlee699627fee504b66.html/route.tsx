import { NextResponse } from 'next/server';

export function GET() {
  const content = 'google-site-verification: googlee699627fee504b66.html';
  return new NextResponse(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
