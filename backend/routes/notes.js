const express = require('express');
const router = express.Router();

// Import the note controller
const noteController = require('../controllers/noteController');

// Define the routes for notes
router.get('/api/notes', noteController.getAllNotes);
router.get('/api/notes/:id', noteController.getNoteById);
router.post('/api/notes', noteController.createNote);
router.put('/api/notes/:id', noteController.updateNote);
router.delete('/api/notes/:id', noteController.deleteNote);

module.exports = router;
