import { NextRequest, NextResponse } from 'next/server';
import { schema } from '../schema';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: number } },
) {
  if (params.id > 10)
    return NextResponse.json({ error: 'user not found...' }, { status: 404 });

  return NextResponse.json({ id: 1, name: 'john' });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: number } },
) {
  const body = await req.json();
  const validation = schema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  if (params.id > 10)
    return NextResponse.json({ error: 'user not found...' }, { status: 404 });

  return NextResponse.json({ id: 1, name: body.name });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: number } },
) {
  if (params.id > 10)
    return NextResponse.json({ error: 'user not found...' }, { status: 404 });

  return NextResponse.json({});
}
