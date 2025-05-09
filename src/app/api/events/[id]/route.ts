// File: app/api/events/[id]/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

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

    // Parse djs and specials from comma-separated strings to arrays
    const formattedEvent = {
      ...event,
      djs: event.djs && typeof event.djs === 'string' 
           ? event.djs.split(',').map(s => s.trim()).filter(s => s !== '') 
           : (event.djs || []),
      specials: event.specials && typeof event.specials === 'string' 
                ? event.specials.split(',').map(s => s.trim()).filter(s => s !== '') 
                : (event.specials || []),
    };

    return NextResponse.json(formattedEvent);
  } catch (error) {
    console.error(`Error fetching event ${id}:`, error);
    return NextResponse.json({ message: 'Error fetching event' }, { status: 500 });
  }
}


// PUT /api/events/[id] - Update an event by ID
// This handler now only considers fields present in the CreateEventPage.tsx form
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  try {
    const body = await request.json();

    const dataToUpdate: Prisma.EventUpdateInput = {};

    // --- Map fields strictly from the frontend form (CreateEventPage.tsx) ---

    if (body.title !== undefined) {
      if (typeof body.title === 'string' && body.title.trim() !== '') {
        dataToUpdate.title = body.title;
      } else if (typeof body.title === 'string' && body.title.trim() === '') {
        // Allow explicitly setting title to empty if needed, though 'required' on form might prevent this.
        // For PUT, often you only send fields you want to change.
        // If an empty string means "remove title", your model should allow null or handle it.
        // For now, let's assume a non-empty string is required if 'title' key is present.
        return NextResponse.json({ message: 'Title, if provided for update, must be a non-empty string' }, { status: 400 });
      }
    }

    if (body.date !== undefined) {
      if (typeof body.date === 'string' && !isNaN(Date.parse(body.date))) {
        dataToUpdate.date = new Date(body.date);
      } else {
        return NextResponse.json({ message: 'Date, if provided for update, must be a valid date string (e.g., YYYY-MM-DD)' }, { status: 400 });
      }
    }

    // 'time' is expected as a single string (start time)
    if (body.time !== undefined) {
        if (typeof body.time === 'string' && body.time.trim() !== '') {
            dataToUpdate.time = body.time;
        
        } else {
            return NextResponse.json({ message: 'Time, if provided for update, must be a non-empty string or null/empty to clear' }, { status: 400 });
        }
    }

    if (body.djs !== undefined) {
      if (Array.isArray(body.djs) && body.djs.every((dj: any) => typeof dj === 'string')) {
        // Filter out empty strings before joining
        const filteredDjs = body.djs.filter((dj: string) => dj.trim() !== "");
        dataToUpdate.djs = filteredDjs.length > 0 ? filteredDjs.join(', ') : null; // Store as ", " separated string or null if all empty
      } else {
        return NextResponse.json({ message: 'DJs, if provided for update, must be an array of strings' }, { status: 400 });
      }
    }

    if (body.specials !== undefined) {
      if (Array.isArray(body.specials) && body.specials.every((s: any) => typeof s === 'string')) {
        // Filter out empty strings before joining
        const filteredSpecials = body.specials.filter((s: string) => s.trim() !== "");
        dataToUpdate.specials = filteredSpecials.length > 0 ? filteredSpecials.join(', ') : null; // Store as ", " separated string or null if all empty
      } else {
        return NextResponse.json({ message: 'Specials, if provided for update, must be an array of strings' }, { status: 400 });
      }
    }

    if (body.imageUrl !== undefined) {
      if (typeof body.imageUrl === 'string' && (body.imageUrl.startsWith('http://') || body.imageUrl.startsWith('https://') || body.imageUrl === "")) {
        dataToUpdate.imageUrl = body.imageUrl; // Allow empty string to clear URL
      } else {
        return NextResponse.json({ message: 'Image URL, if provided for update, must be a valid URL, an empty string, or null' }, { status: 400 });
      }
    }

    // --- End of field mapping ---

    if (Object.keys(dataToUpdate).length === 0) {
      return NextResponse.json({ message: 'No valid fields provided for update' }, { status: 400 });
    }

    const updatedEvent = await prisma.event.update({
        where: { id },
        data: dataToUpdate,
    });

    if (!updatedEvent) {
        // Should be caught by Prisma P2025 error if ID not found
        return NextResponse.json({ message: 'Event not found or update failed (unexpected)' }, { status: 404 });
    }

    return NextResponse.json(updatedEvent);

  } catch (error) {
    console.error(`Error updating event ${id}:`, error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') { // "Record to update not found"
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
    return NextResponse.json({ message: 'Event deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error(`Error deleting event ${id}:`, error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') { // "Record to delete not found"
        return NextResponse.json({ message: 'Event not found' }, { status: 404 });
      }
    }
    return NextResponse.json({ message: 'Error deleting event' }, { status: 500 });
  }
}