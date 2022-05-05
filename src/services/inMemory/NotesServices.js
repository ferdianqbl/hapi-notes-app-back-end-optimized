const { nanoid } = require("nanoid");

class NoteServices {
  constructor() {
    this._notes = [];
  }

  addNote({ title, body, tags }) {
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newNote = {
      title,
      tags,
      body,
      id,
      createdAt,
      updatedAt,
    };

    this._notes.push(newNote);

    const isSuccess = this._notes.filter((note) => note.id === id).length > 0;

    if (!isSuccess) throw new Error("Note failed to be added");

    return id;
  }

  getNotes() {
    return this._notes;
  }

  getNoteById(id) {
    const note = this._notes.filter((note) => note.id === id)[0];

    if (!note) throw new Error("Note not found");

    return note;
  }

  editNoteById(id, { title, body, tags }) {
    const noteIdx = this._notes.findIndex((note) => note.id === id);

    if (noteIdx === -1) throw new Error("Note not found. Failed to edit");

    const updateAt = new Date().toISOString();

    this._notes[noteIdx] = {
      ...this._notes[noteIdx],
      title,
      body,
      tags,
      updateAt,
    };
  }

  deleteNoteById(id) {
    const noteIdx = this._notes.findIndex((note) => note.id === id);

    if (noteIdx === -1) throw new Error("Note not found. Failed to delete");

    this._notes.splice(noteIdx, 1);
  }
}

module.exports = NoteServices;
