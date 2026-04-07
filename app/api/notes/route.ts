import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, content } = await req.json();
    const client = await clientPromise;
    const db = client.db();

    // Get user id from email
    const user = await db.collection("users").findOne({ email: session.user.email });

    const newNote = {
      userId: user?._id,
      title,
      content,
      createdAt: new Date(),
    };

    const result = await db.collection("notes").insertOne(newNote);

    return NextResponse.json({ message: "Note created", noteId: result.insertedId }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create note" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await getServerSession();
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db();
    const user = await db.collection("users").findOne({ email: session.user.email });

    const notes = await db.collection("notes")
      .find({ userId: user?._id })
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(notes);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch notes" }, { status: 500 });
  }
}