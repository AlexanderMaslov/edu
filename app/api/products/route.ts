import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  return NextResponse.json([
    {
      id: 1,
      name: 'milk',
      price: 2.5,
    },
    {
      id: 2,
      name: 'Bread',
      price: 3.5,
    },
  ]);
}
