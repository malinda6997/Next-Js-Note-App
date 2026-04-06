import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Note from "@/models/Note";


export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = await params;
    await dbConnect();
    
    const note = await Note.findById(id);
    if (!note) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 });
    }
    return NextResponse.json(note);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch note" }, { status: 500 });
  }
}


export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = await params;
    await dbConnect();
    
    const body = await req.json();
    const updatedNote = await Note.findByIdAndUpdate(id, body, { new: true });
    
    if (!updatedNote) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 });
    }
    return NextResponse.json(updatedNote);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update note" }, { status: 500 });
  }
}


export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = await params;
    await dbConnect();
    
    const deletedNote = await Note.findByIdAndDelete(id);
    if (!deletedNote) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Note deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete note" }, { status: 500 });
  }
}