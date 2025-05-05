// src/app/api/events/featured/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // First try to find an event marked as "featured"
    let featuredEvent = await prisma.event.findFirst({
      where: { featured: true }
    });
    
    // If no event is marked as featured, find the next upcoming event
    if (!featuredEvent) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      featuredEvent = await prisma.event.findFirst({
        where: {
          date: { gte: today }
        },
        orderBy: { date: 'asc' }
      });
    }
    
    // If still no event, find the most recent past event
    if (!featuredEvent) {
      featuredEvent = await prisma.event.findFirst({
        orderBy: { date: 'desc' }
      });
    }
    
    if (!featuredEvent) {
      return NextResponse.json(null);
    }
    
    return NextResponse.json(featuredEvent);
  } catch (error) {
    console.error('Error fetching featured event:', error);
    return NextResponse.json(
      { error: 'Failed to fetch featured event' },
      { status: 500 }
    );
  }
}
