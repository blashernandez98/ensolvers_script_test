const express = require('express');
const router = express.Router();

// Import the tag controller
const tagController = require('../controllers/tagController');

// Define the routes for tags
router.get('/api/tags', tagController.getAllTags);
router.get('/api/tags/:id', tagController.getTagById);
router.post('/api/tags', tagController.createTag);
router.delete('/api/tags/:id', tagController.deleteTag);

module.exports = router;
