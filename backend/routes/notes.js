const express = require('express');
const router = express.Router();

// Import the note controller
const noteController = require('../controllers/noteController');

// Define the routes for notes
router.get('/notes', noteController.getAllNotes);
router.get('/notes/:id', noteController.getNoteById);
router.post('/notes', noteController.createNote);
router.put('/notes/:id', noteController.updateNote);
router.delete('/notes/:id', noteController.deleteNote);

module.exports = router;
