# Task Manager Application

A full-stack task management app built with React (frontend) and Node.js + Express (backend).

## Tech Stack
- **Frontend:** React, Material UI, Bootstrap
- **Backend:** Node.js, Express
- **Storage:** tasks.json (file-based)
- **Deployment:** Vercel (frontend), Render (backend)

## Project Structure
task-manager/

├── backend/      # Express REST API

├── frontend/     # React app

└── README.md

## Getting Started

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm start
```

## API Endpoints
| Method | Endpoint       | Description      |
|--------|---------------|------------------|
| GET    | /tasks        | Get all tasks    |
| POST   | /tasks        | Create a task    |
| PUT    | /tasks/:id    | Update a task    |
| DELETE | /tasks/:id    | Delete a task    |