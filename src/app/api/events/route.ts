import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // Parse and validate required fields
    const {
      title,
      date,
      time,
      djs,
      specials,
      instagram,
      website,
      imageUrl,
      address,
    } = data;

    if (!title || !date || !imageUrl) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    // Convert date to Date object
    let eventDate: Date;
    try {
      eventDate = new Date(date);
      if (isNaN(eventDate.getTime())) throw new Error();
    } catch {
      return NextResponse.json(
        { error: "Invalid date format." },
        { status: 400 }
      );
    }

    // Format DJs and specials as comma-separated strings for Prisma
    const djsString = Array.isArray(djs) ? djs.join(", ") : "";
    const specialsString = Array.isArray(specials) ? specials.join(", ") : "";

    // Create the event in the database
    const event = await prisma.event.create({
      data: {
        title,
        date: eventDate,
        time: time || null,
        djs: djsString,
        specials: specialsString,
        imageUrl,
        // If you want to store Instagram and website, make sure your schema supports it
        // instagram,
        // website,
        // address, // If you want to store address, make sure your schema supports it
      },
    });

    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const events = await prisma.event.findMany({
      orderBy: {
        date: 'asc', // Fetch events sorted by date
      },
    });

    // Parse comma-separated strings back into arrays
    const formattedEvents = events.map(event => ({
      ...event,
      djs: event.djs ? event.djs.split(',').map(s => s.trim()).filter(s => s !== '') : [],
      specials: event.specials ? event.specials.split(',').map(s => s.trim()).filter(s => s !== '') : [],
    }));

    return NextResponse.json(formattedEvents);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error fetching events" },
      { status: 500 }
    );
  }
}
