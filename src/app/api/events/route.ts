import { NextResponse } from 'next/server';
import { PrismaClient, Prisma } from '@prisma/client'; // Import Prisma type

const prisma = new PrismaClient();

// GET /api/events - Fetch all events
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const featured = searchParams.get('featured'); // Check for ?featured=true query param

  try {
    // Define whereClause with the correct Prisma type
    const whereClause: Prisma.EventWhereInput = featured === 'true' ? { featured: true } : {};
    const events = await prisma.event.findMany({
      where: whereClause, // Remove 'as any'
      orderBy: {
        date: 'asc', // Order by date
      },
    });
    return NextResponse.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json({ message: 'Error fetching events' }, { status: 500 });
  }
}

import { z } from 'zod';

// Zod schema for validation (reusable for POST and PUT)
const eventSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  description: z.string().optional(),
  date: z.string().refine((date) => !isNaN(Date.parse(date)), { message: 'Invalid date format (use YYYY-MM-DD)' }),
  startTime: z.string().min(1, { message: 'Start time is required' }),
  endTime: z.string().min(1, { message: 'End time is required' }),
  featured: z.boolean().optional().default(false),
  djs: z.array(z.string()).optional(),
  happyHourStart: z.string().optional(),
  happyHourEnd: z.string().optional(),
  specials: z.array(z.string()).optional(),
  imageUrl: z.string().url({ message: 'Valid image URL is required' }),
});

// POST /api/events - Create a new event
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = eventSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ message: 'Validation failed', errors: validation.error.flatten().fieldErrors }, { status: 400 });
    }

    const {
      title,
      description,
      date,
      startTime,
      endTime,
      featured,
      djs,
      happyHourStart,
      happyHourEnd,
      specials,
      imageUrl,
    } = validation.data;

    const time = `${startTime} - ${endTime}`;
    const happyHourTime = happyHourStart && happyHourEnd ? `${happyHourStart} - ${happyHourEnd}` : null;

    let newEvent;

    // Use a transaction to ensure atomicity when handling the 'featured' flag
    await prisma.$transaction(async (tx) => {
      // If this event is marked as featured, unmark all other events first
      if (featured) {
        await tx.event.updateMany({
          where: { featured: true },
          data: { featured: false },
        });
      }

      // Create the new event
      newEvent = await tx.event.create({
        data: {
          title,
          description,
          date: new Date(date), // Convert validated date string to Date object
          time: time,
          featured: featured,
          djs: djs?.join(', '), // Store as comma-separated string
          happyHourTime: happyHourTime,
          specials: specials?.join('; '), // Store as semi-colon separated string
          imageUrl,
        },
      });
    });

    return NextResponse.json(newEvent, { status: 201 });

  } catch (error) {
    console.error('Error creating event:', error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Handle specific Prisma errors like unique constraints
      if (error.code === 'P2002') {
        return NextResponse.json({ message: 'An event with similar details might already exist.' }, { status: 409 });
      }
    }
    if (error instanceof Error && error.message.includes('Invalid date')) {
        return NextResponse.json({ message: 'Invalid date format provided' }, { status: 400 });
    }
    return NextResponse.json({ message: 'Error creating event' }, { status: 500 });
  }
}

// PUT /api/events/[id] - Update an existing event
// Note: We need a dynamic route file [id]/route.ts for this, but for simplicity, adding here.
// In a real app, move PUT and DELETE to /api/events/[id]/route.ts

// DELETE /api/events/[id] - Delete an event
// Note: Similarly, this should be in a dynamic route file.

// Ensure Prisma Client disconnects when the server stops
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});

// Helper function to get event ID from URL (Needed if PUT/DELETE were here)
// function getEventIdFromUrl(url: string): string | null {
//   const match = url.match(/\/api\/events\/([^\/]+)/);
//   return match ? match[1] : null;
// }