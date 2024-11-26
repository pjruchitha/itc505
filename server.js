const express = require('express');
const path = require('path');
const app = express();
const port = 8080;

// Serve static files from the "public" directory
const publicDirectory = path.join(__dirname, 'public');
app.use(express.static(publicDirectory));

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Route to display the form
app.get('/', (req, res) => {
  res.sendFile(path.join(publicDirectory, 'index.html'));
});

// Route to handle form submission and generate the Mad Lib
app.post('/submit-form', (req, res) => {
  const { noun, adjective, verb, place, pluralNoun } = req.body;

  // Ensure all fields are filled
  if (!noun || !adjective || !verb || !place || !pluralNoun) {
    return res.send(`
      <h1>Oops!</h1>
      <p>All fields are required. Please fill them out and try again.</p>
      <a href="/">Back to Form</a>
    `);
  }

  // Generate the Mad Lib story
  const madLibStory = `
    <h1>Your Mad Lib:</h1>
    <p>In a faraway land called <strong>${place}</strong>, there was a <strong>${adjective} ${noun}</strong>. 
    Every morning, it would <strong>${verb}</strong> with its friends, a group of <strong>${pluralNoun}</strong>. 
    One day, the ${noun} found a magical portal that led to a mysterious realm. 
    They all shouted, "Adventure awaits!" and leapt into the portal.</p>
    <p>What happens next? You decide!</p>
    <a href="/">Create Another Mad Lib</a>
  `;

  // Send the generated Mad Lib story to the user
  res.send(madLibStory);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
