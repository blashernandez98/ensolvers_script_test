// Import the noteTag service
const noteTagService = require('../services/noteTagService');
const noteService = require('../services/noteService');
const tagService = require('../services/tagService');

// Controller method to associate a tag with a specific note
exports.addTagToNote = async (req, res, next) => {
  try {
    const { noteId, tagId } = req.body;
    await noteTagService.addTagToNote(noteId, tagId);
    res.json({ message: 'Tag added to note' });
  } catch (err) {
    next(err);
  }
};

// Controller method to remove the association between a tag and a note
exports.removeTagFromNote = async (req, res, next) => {
  try {
    const { noteId, tagId } = req.body;
    await noteTagService.removeTagFromNote(noteId, tagId);
    res.json({ message: 'Tag removed from note' });
  } catch (err) {
    next(err);
  }
};

// Controller method to get all tags associated with a specific note
exports.getTagsForNote = async (req, res, next) => {
  try {
    const noteId = parseInt(req.params.noteId);
    const tagsIds = await noteTagService.getTagsForNoteId(noteId);
    console.log(tagsIds);
    const tagsPromises = tagsIds.map(async (tagId) => await tagService.getTagById(tagId));
    const tags = await Promise.all(tagsPromises);
    res.json(tags);
  } catch (err) {
    next(err);
  }
};

// Controller method to get all notes associated with a specific tag
exports.getNotesForTag = async (req, res, next) => {
  try {
    const tagId = parseInt(req.params.tagId);
    const notesIds = await noteTagService.getNotesIdsForTagId(tagId);
    console.log(notesIds);
    const notesPromises = notesIds.map(async (noteId) => await noteService.getNoteById(noteId));
    const notes = await Promise.all(notesPromises);
    res.json(notes);
  } catch (err) {
    next(err);
  }
};
