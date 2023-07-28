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
const apiRoutes = require('./routes/notes');

// Use api routes
app.use('/api', apiRoutes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
