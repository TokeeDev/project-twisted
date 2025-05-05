// src/app/api/events/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Convert string date to Date object
    const date = new Date(body.date);
    
    // Create the event
    const event = await prisma.event.create({
      data: {
        title: body.title,
        date: date,
        time: body.time,
        imageUrl: body.imageUrl,
        djs: body.djs || null,
        specials: body.specials || null,
        featured: body.featured || false
      }
    });
    
    // If this event is featured, unfeatured all other events
    if (body.featured) {
      await prisma.event.updateMany({
        where: {
          id: { not: event.id },
          featured: true
        },
        data: { featured: false }
      });
    }
    
    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const events = await prisma.event.findMany({
      orderBy: { date: 'desc' }
    });
    
    return NextResponse.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}
