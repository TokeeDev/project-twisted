// src/app/api/menu-items/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const menuItem = await prisma.menuItem.create({
      data: {
        name: body.name,
        description: body.description || null,
        price: body.price || null,
        imageUrl: body.imageUrl || null,
        category: body.category || null
      }
    });
    
    return NextResponse.json(menuItem, { status: 201 });
  } catch (error) {
    console.error('Error creating menu item:', error);
    return NextResponse.json(
      { error: 'Failed to create menu item' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const menuItems = await prisma.menuItem.findMany({
      orderBy: { createdAt: 'desc' }
    });
    
    return NextResponse.json(menuItems);
  } catch (error) {
    console.error('Error fetching menu items:', error);
    return NextResponse.json(
      { error: 'Failed to fetch menu items' },
      { status: 500 }
    );
  }
}
