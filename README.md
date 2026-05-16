# 🎮 Roblox Questionnaire App

A web-based questionnaire application built with Node.js and Express.js for gathering feedback about Roblox Studio experience.

## ✨ Features

- 🎯 10 Roblox Studio questionnaire questions
- 📊 Automatic response tracking and counting
- 💾 All answers stored as "No" by default
- 🎨 Beautiful gradient UI with responsive design
- ✅ Success/error message feedback
- 📱 Mobile-friendly interface
- 🔧 RESTful API endpoints

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/hamadfr996-byte/roblox-questionare-app.git
   cd roblox-questionare-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the application**
   ```bash
   npm start
   ```

4. **Open your browser**
   ```
   http://localhost:3000
   ```

## 🛠️ Development Mode

To run the app with automatic restart on file changes (requires nodemon):

```bash
npm run dev
```

## 📡 API Endpoints

### `GET /`
Serves the main questionnaire page

### `GET /api/questions`
Returns all questionnaire questions

**Response:**
```json
{
  "questions": [
    "Are you familiar with Roblox Studio?",
    "Have you created a game in Roblox Studio?",
    ...
  ]
}
```

### `POST /api/submit`
Submits a questionnaire response

**Response:**
```json
{
  "success": true,
  "message": "Questionnaire submitted successfully!",
  "id": 1
}
```

### `GET /api/responses`
Retrrieves all submitted responses

**Response:**
```json
{
  "responses": [...],
  "count": 5
}
```

### `GET /api/response-count`
Gets the total number of responses

**Response:**
```json
{
  "count": 5
}
```

## 📁 Project Structure

```
roblox-questionare-app/
├── index.js              # Main server file
├── package.json          # Dependencies and scripts
├── responses.json        # Stored responses (auto-generated)
├── public/
│   ├── index.html        # Questionnaire form
│   ├── style.css         # Styling
│   └── script.js         # Frontend logic
└── README.md             # This file
```

## ❓ Questions Included

1. Are you familiar with Roblox Studio?
2. Have you created a game in Roblox Studio?
3. Do you use Lua scripting in your projects?
4. Are you interested in learning advanced Roblox development?
5. Have you published a game on Roblox?
6. Do you use version control (Git) in your workflow?
7. Are you part of a Roblox development community?
8. Do you want to improve your scripting skills?
9. Have you encountered bugs in your Roblox projects?
10. Would you like tutorials on Roblox best practices?

## 💾 Data Storage

Responses are stored in a `responses.json` file with the following structure:

```json
{
  "responses": [
    {
      "id": 1,
      "timestamp": "2026-05-16T12:34:56.789Z",
      "answers": [
        {
          "question": "Are you familiar with Roblox Studio?",
          "answer": "No"
        }
      ]
    }
  ],
  "count": 1
}
```

## 🔧 Customization

### Add/Edit Questions

Edit the `questions` array in `index.js`:

```javascript
const questions = [
  "Your question here?",
  "Another question?"
];
```

### Change Port

Edit the `PORT` variable in `index.js`:

```javascript
const PORT = 3001; // Change this
```

### Styling

Modify `public/style.css` to customize the appearance.

## 📦 Dependencies

- **express**: Web framework
- **body-parser**: Middleware for parsing request bodies

## 📄 License

MIT License - feel free to use this project for any purpose.

## 👤 Author

hamadfr996-byte

## 🤝 Support

If you encounter any issues, please check the following:

1. Node.js is installed: `node --version`
2. Port 3000 is not in use
3. All dependencies are installed: `npm install`

---

**Happy developing! 🚀**
