import { NextResponse } from 'next/server';
import { PrismaClient, Prisma } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

// Zod schema for validation (can reuse or adapt from the main route)
// Optional fields for PUT as not all fields might be updated
const eventUpdateSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }).optional(),
  description: z.string().optional().nullable(),
  date: z.string().refine((date) => !isNaN(Date.parse(date)), { message: 'Invalid date format (use YYYY-MM-DD)' }).optional(),
  startTime: z.string().min(1, { message: 'Start time is required' }).optional(),
  endTime: z.string().min(1, { message: 'End time is required' }).optional(),
  featured: z.boolean().optional(),
  djs: z.array(z.string()).optional(),
  happyHourStart: z.string().optional().nullable(),
  happyHourEnd: z.string().optional().nullable(),
  specials: z.array(z.string()).optional(),
  imageUrl: z.string().url({ message: 'Valid image URL is required' }).optional(),
});

// GET /api/events/[id] - Fetch a single event by ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  try {
    const event = await prisma.event.findUnique({
      where: { id },
    });
    if (!event) {
      return NextResponse.json({ message: 'Event not found' }, { status: 404 });
    }
    return NextResponse.json(event);
  } catch (error) {
    console.error(`Error fetching event ${id}:`, error);
    return NextResponse.json({ message: 'Error fetching event' }, { status: 500 });
  }
}


// PUT /api/events/[id] - Update an event by ID
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  try {
    const body = await request.json();
    const validation = eventUpdateSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ message: 'Validation failed', errors: validation.error.flatten().fieldErrors }, { status: 400 });
    }

    const dataToUpdate: Prisma.EventUpdateInput = {};
    const validatedData = validation.data;

    // Map validated fields to Prisma update input
    if (validatedData.title) dataToUpdate.title = validatedData.title;
    if (validatedData.description !== undefined) dataToUpdate.description = validatedData.description;
    if (validatedData.date) dataToUpdate.date = new Date(validatedData.date);
    if (validatedData.startTime && validatedData.endTime) {
      dataToUpdate.time = `${validatedData.startTime} - ${validatedData.endTime}`;
    }
    if (validatedData.featured !== undefined) dataToUpdate.featured = validatedData.featured;
    if (validatedData.djs) dataToUpdate.djs = validatedData.djs.join(', ');
    if (validatedData.happyHourStart !== undefined && validatedData.happyHourEnd !== undefined) {
        dataToUpdate.happyHourTime = validatedData.happyHourStart && validatedData.happyHourEnd ? `${validatedData.happyHourStart} - ${validatedData.happyHourEnd}` : null;
    }
    if (validatedData.specials) dataToUpdate.specials = validatedData.specials.join('; ');
    if (validatedData.imageUrl) dataToUpdate.imageUrl = validatedData.imageUrl;

    let updatedEvent;

    // Use transaction if updating the 'featured' status
    if (validatedData.featured !== undefined) {
        await prisma.$transaction(async (tx) => {
            // If setting this event to featured, unmark others first
            if (validatedData.featured === true) {
                await tx.event.updateMany({
                    where: { id: { not: id }, featured: true }, // Unmark others
                    data: { featured: false },
                });
            }
            // Update the target event
            updatedEvent = await tx.event.update({
                where: { id },
                data: dataToUpdate,
            });
        });
    } else {
        // Standard update if 'featured' is not changing
        updatedEvent = await prisma.event.update({
            where: { id },
            data: dataToUpdate,
        });
    }

    if (!updatedEvent) {
        // Should not happen if transaction logic is correct, but good practice
        return NextResponse.json({ message: 'Event not found or update failed' }, { status: 404 });
    }

    return NextResponse.json(updatedEvent);

  } catch (error) {
    console.error(`Error updating event ${id}:`, error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') { // Record to update not found
        return NextResponse.json({ message: 'Event not found' }, { status: 404 });
      }
    }
    return NextResponse.json({ message: 'Error updating event' }, { status: 500 });
  }
}

// DELETE /api/events/[id] - Delete an event by ID
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  try {
    await prisma.event.delete({
      where: { id },
    });
    return NextResponse.json({ message: 'Event deleted successfully' }, { status: 200 }); // Can also use 204 No Content
  } catch (error) {
    console.error(`Error deleting event ${id}:`, error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') { // Record to delete not found
        return NextResponse.json({ message: 'Event not found' }, { status: 404 });
      }
    }
    return NextResponse.json({ message: 'Error deleting event' }, { status: 500 });
  }
}

// Ensure Prisma Client disconnects when the server stops (optional here, but good practice)
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});