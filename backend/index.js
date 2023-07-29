const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Create an instance of Express app
const app = express();

// Middleware for CORS
app.use(cors());

// Middleware to parse incoming request bodies
app.use(bodyParser.json());

// Import API routes
const noteRoutes = require('./routes/notes');
const tagRoutes = require('./routes/tags');
const noteTagRoutes = require('./routes/noteTags');

// Use api routes
app.use(noteRoutes);
app.use(tagRoutes);
app.use(noteTagRoutes);

// Middleware for error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

