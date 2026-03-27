# 🎯 Smart Interview Simulator

A full-stack AI-powered mock interview application. Practice real interview questions for Software Engineering, Data Analysis, and HR roles — and get instant AI feedback with scoring.

---

## 🚀 Quick Start

### 1. Clone / extract the project

```bash
cd smart-interview
```

### 2. Setup the backend

```bash
cd server
npm install
cp .env.example .env
# Edit .env and add your OpenAI API key
npm start
```

The server runs at **http://localhost:5000**

### 3. Setup the frontend (new terminal)

```bash
cd client
npm install
npm run dev
```

The app runs at **http://localhost:5173**

---

## 🔑 Environment Variables

Create `server/.env` from `server/.env.example`:

```env
OPENAI_API_KEY=your_openai_api_key_here
PORT=5000
```

Get your API key at: https://platform.openai.com/api-keys

---

## 📁 Project Structure

```
smart-interview/
├── client/                     # React + Vite frontend
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.jsx        # Role selection page
│   │   │   ├── Interview.jsx   # Question + answer page
│   │   │   └── Result.jsx      # Score + feedback page
│   │   ├── components/
│   │   │   ├── FeedbackCard.jsx
│   │   │   ├── ProgressBar.jsx
│   │   │   ├── ScoreRing.jsx
│   │   │   └── Spinner.jsx
│   │   ├── utils/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
└── server/                     # Node.js + Express backend
    ├── controllers/
    │   └── interviewController.js
    ├── routes/
    │   └── interview.js
    ├── index.js
    ├── .env.example
    └── package.json
```

---

## 🎨 Features

- **3 Interview Roles**: Software Engineer, Data Analyst, HR
- **AI Question Generation**: Unique, non-repeating questions per session
- **Answer Evaluation**: Score (0–10), strengths, weaknesses, ideal answer
- **3–5 Questions per session** (user selectable)
- **Results Dashboard**: Visual score rings, per-question bars, full feedback
- **Dark Theme**: Obsidian + ember color palette, glass morphism cards

---

## 🛠 Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React 18, Vite, Tailwind CSS |
| Backend | Node.js, Express |
| AI | OpenAI GPT-4o-mini |
| Routing | React Router v6 |
| HTTP | Axios |
