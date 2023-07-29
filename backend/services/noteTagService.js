// Import the Prisma client instance
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Service method to associate a tag with a specific note
exports.addTagToNote = async (noteId, tagId) => {
  try {
    return prisma.note_tags.create({
      data: {
        note_id: noteId,
        tag_id: tagId,
      },
    });    
  } catch (error) {
    return error;
  }
};

// Service method to remove the association between a tag and a note
exports.removeTagFromNote = async (noteId, tagId) => {
  return prisma.note_tags.delete({
    where: {
      note_id_tag_id: {
        note_id: noteId,
        tag_id: tagId,
      },
    },
  });
};

// Service method to get all notes id's associated with a specific tag
exports.getNotesIdsForTagId = async (tagId) => {
  const noteTags = await prisma.note_tags.findMany({
    where: {
      tag_id: tagId,
    },
  });
  return noteTags.map((noteTag) => noteTag.note_id);
}

// Service method to get all tags associated with a specific note
exports.getTagsForNoteId = async (noteId) => {
  const noteTags = await prisma.note_tags.findMany({
    where: {
      note_id: noteId,
    },
  });
  return noteTags.map((noteTag) => noteTag.tag_id);
}