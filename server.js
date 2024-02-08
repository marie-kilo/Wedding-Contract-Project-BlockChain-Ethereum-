
// import express from 'express';

// const app = express();
// const port = 3000;

// // Serve static files from 'public' directory
// // app.use(express.static('public'));

// // Support JSON-encoded bodies
// app.use(express.json());

// // Start the server
// app.listen(port, () => {
//   console.log(`Server listening at http://localhost:${port}`);
// });


import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

// Serve static files from the "public" directory
app.use(express.static(join(__dirname, 'public')));

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});



  

