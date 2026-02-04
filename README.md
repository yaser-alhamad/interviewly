# AI Interview Coach -Interviewly

A full-stack web application that provides AI-powered interview coaching with speech-to-text capabilities.

## Features

- Interview setup with job role, seniority level, and number of questions
- AI-generated interview questions using Gemini 2.5 Pro
- Browser-based speech-to-text for user answers
- Detailed feedback generation with scoring
- Responsive React frontend

## Architecture

### Backend

- **Framework**: FastAPI (Python)
- **AI Model**: Google Gemini 2.5 Pro via LangChain
- **Session Management**: In-memory storage

### Frontend

- **Framework**: React
- **Build Tool**: Vite
- **Styling**: Tailwind CSS (via CDN)
- **Speech Recognition**: Web Speech API

## Prerequisites

- Python 3.8+
- Node.js 16+
- Google Gemini API key

## Installation & Setup

### Backend Setup

1. Install Python dependencies:

```bash
pip install fastapi uvicorn python-multipart google-generativeai langchain-google-genai pydantic python-dotenv
```

2. Set environment variables:

```bash
# Copy the example environment file
cp backend/.env.example backend/.env

# Then edit backend/.env with your API keys
GEMINI_API_KEY=your_actual_gemini_api_key
```

3. Run the backend server:

```bash
cd backend
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The frontend will be available at http://localhost:5173

## API Endpoints

- `POST /interview/start` - Start a new interview session
- `GET /interview/question?session_id=...` - Get current question as text
- `POST /interview/answer?session_id=...` - Submit user's answer
- `GET /interview/feedback?session_id=...` - Get interview feedback

## Usage

1. Open the frontend in your browser (Chrome or Edge recommended for speech recognition)
2. Fill in the interview details (job role, seniority, number of questions)
3. Click "Start Interview"
4. Read each question displayed on screen
5. Record your answer using the microphone
6. Submit your answer when finished speaking
7. Receive detailed feedback after all questions are completed
