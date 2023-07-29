// Import the note service
const noteService = require('../services/noteService');

// Controller method to get all notes
exports.getAllNotes = async (req, res, next) => {
  try {
    const notes = await noteService.getAllNotes();
    res.json(notes);
  } catch (err) {
    next(err);
  }
};

// Controller method to get a note by ID
exports.getNoteById = async (req, res, next) => {
  try {
    const noteId = parseInt(req.params.id);
    const note = await noteService.getNoteById(noteId);
    res.json(note);
  } catch (err) {
    next(err);
  }
};

// Controller method to create a new note
exports.createNote = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      res.error('Title and content are required fields');
    }
    const newNote = await noteService.createNote(title, content);
    res.json(newNote);
  } catch (err) {
    next(err);
  }
};

// Controller method to update a note
exports.updateNote = async (req, res, next) => {
  try {
    const noteId = parseInt(req.params.id);
    const { title, content, archived } = req.body;
    const updatedNote = await noteService.updateNote(noteId, title, content, archived);
    res.json(updatedNote);
  } catch (err) {
    next(err);
  }
};

// Controller method to delete a note
exports.deleteNote = async (req, res, next) => {
  try {
    const noteId = parseInt(req.params.id);
    await noteService.deleteNote(noteId);
    res.json({ message: 'Note deleted' })
  } catch (err) {
    next(err);
  }
};
