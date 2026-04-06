import mongoose, { Schema, model, models } from "mongoose";


const NoteSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title"],
    },
    content: {
      type: String,
      required: [true, "Please provide content"],
    },

  },
  { timestamps: true } 
);


const Note = models.Note || model("Note", NoteSchema);

export default Note;