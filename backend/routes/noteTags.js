const express = require('express');
const router = express.Router();

// Import the noteTag controller
const noteTagController = require('../controllers/noteTagController');

// Define the routes for noteTag associations under /api/note-tags
router.post('/api/note-tags', noteTagController.addTagToNote);
router.delete('/api/note-tags', noteTagController.removeTagFromNote);
router.get('/api/tags/:tagId/notes', noteTagController.getNotesForTag);
router.get('/api/notes/:noteId/tags', noteTagController.getTagsForNote);

module.exports = router;
