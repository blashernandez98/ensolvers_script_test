// Import the Prisma client instance
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Service method to get all notes
exports.getAllNotes = async () => {
  return prisma.notes.findMany();
};

// Service method to get a note by ID
exports.getNoteById = async (noteId) => {
  return prisma.notes.findUnique({
    where: { id: noteId },
  });
};

// Service method to create a new note
exports.createNote = async (title, content) => {
  return prisma.notes.create({
    data: {
      title,
      content,
    },
  });
};

// Service method to update a note
exports.updateNote = async (noteId, title, content, archived) => {
  return prisma.notes.update({
    where: { id: noteId },
    data: {
      title,
      content,
      archived,
    },
  });
};

// Service method to delete a note
exports.deleteNote = async (noteId) => {
  return prisma.notes.delete({
    where: { id: noteId },
  });
};
