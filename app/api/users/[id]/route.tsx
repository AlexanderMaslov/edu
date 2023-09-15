import { NextRequest, NextResponse } from 'next/server';
import { schema } from '../schema';
import { prisma } from '@/prisma/client';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const data = await prisma.user.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!data)
    return NextResponse.json({ error: 'user not found...' }, { status: 404 });

  return NextResponse.json(data);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const body = await req.json();
  const validation = schema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const user = await prisma.user.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!user)
    return NextResponse.json({ error: 'user not found...' }, { status: 404 });

  const data = await prisma.user.update({
    where: { id: user.id },
    data: {
      name: body.name,
      email: body.email,
    },
  });

  return NextResponse.json(data);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const user = await prisma.user.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!user)
    return NextResponse.json({ error: 'user not found...' }, { status: 404 });

  await prisma.user.delete({
    where: { id: user.id },
  });

  return NextResponse.json({});
}
