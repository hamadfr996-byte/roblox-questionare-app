const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Data storage file
const dataFile = path.join(__dirname, 'responses.json');

// Initialize responses file if it doesn't exist
if (!fs.existsSync(dataFile)) {
  fs.writeFileSync(dataFile, JSON.stringify({ responses: [], count: 0 }, null, 2));
}

// Questionnaire questions
const questions = [
  "Are you familiar with Roblox Studio?",
  "Have you created a game in Roblox Studio?",
  "Do you use Lua scripting in your projects?",
  "Are you interested in learning advanced Roblox development?",
  "Have you published a game on Roblox?",
  "Do you use version control (Git) in your workflow?",
  "Are you part of a Roblox development community?",
  "Do you want to improve your scripting skills?",
  "Have you encountered bugs in your Roblox projects?",
  "Would you like tutorials on Roblox best practices?"
];

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/questions', (req, res) => {
  res.json({ questions });
});

app.post('/api/submit', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(dataFile, 'utf-8'));
    
    // Create response object with all answers as "No"
    const response = {
      id: data.count + 1,
      timestamp: new Date().toISOString(),
      answers: questions.map(q => ({ question: q, answer: "No" }))
    };
    
    data.responses.push(response);
    data.count += 1;
    
    fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
    
    res.json({ success: true, message: 'Questionnaire submitted successfully!', id: response.id });
  } catch (error) {
    console.error('Error submitting response:', error);
    res.status(500).json({ success: false, message: 'Error submitting response' });
  }
});

app.get('/api/responses', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(dataFile, 'utf-8'));
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error reading responses' });
  }
});

app.get('/api/response-count', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(dataFile, 'utf-8'));
    res.json({ count: data.count });
  } catch (error) {
    res.status(500).json({ error: 'Error reading count' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🎮 Roblox Questionnaire App running at http://localhost:${PORT}`);
  console.log(`📊 View responses at http://localhost:${PORT}/api/responses`);
});
