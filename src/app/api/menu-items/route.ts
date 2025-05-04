import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/menu-items - Fetch all menu items
export async function GET() {
  try {
    const menuItems = await prisma.menuItem.findMany({
      orderBy: {
        createdAt: 'asc', // Or order by category, name, etc.
      },
    });
    return NextResponse.json(menuItems);
  } catch (error) {
    console.error('Error fetching menu items:', error);
    return NextResponse.json({ message: 'Error fetching menu items' }, { status: 500 });
  }
}

// POST /api/menu-items - Create a new menu item
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description, price, imageUrl, category } = body;

    // Basic validation
    if (!name) {
      return NextResponse.json({ message: 'Menu item name is required' }, { status: 400 });
    }

    const newMenuItem = await prisma.menuItem.create({
      data: {
        name,
        description,
        price, // Ensure price is handled correctly (string in schema)
        imageUrl,
        category,
      },
    });
    return NextResponse.json(newMenuItem, { status: 201 });
  } catch (error) {
    console.error('Error creating menu item:', error);
    // Add more specific error handling if needed (e.g., validation errors)
    return NextResponse.json({ message: 'Error creating menu item' }, { status: 500 });
  }
}

// Ensure Prisma Client disconnects when the server stops (optional but good practice)
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});