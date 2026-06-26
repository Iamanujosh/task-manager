# Task Manager Application

A full-stack **Task Management Application** built with **React**, **Node.js**, and **Express**. The application enables users to create, view, update, and delete tasks through a responsive Material UI interface and a RESTful backend API.

---

## Live Demo

* **Frontend:** https://task-manager-fbac.vercel.app
* **Backend API:** https://task-manager-0xuz.onrender.com

---

## Features

* Create new tasks
* View all tasks
* Edit existing tasks
* Delete tasks
* Mark tasks as completed
* Set task priority (High, Medium, Low)
* Responsive Material UI interface
* RESTful API using Express
* JSON file-based task storage

---

## Tech Stack

### Frontend

* React
* Vite
* Axios
* Material UI

### Backend

* Node.js
* Express.js
* UUID
* CORS

### Storage

* JSON (`tasks.json`)

### Deployment

* Frontend: Vercel
* Backend: Render

---

## Project Structure

```text
task-manager/
│
├── backend/
│   ├── server.js
│   ├── tasks.json
│   ├── package.json
│   └── ...
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
└── README.md
```

---

## API Endpoints

| Method | Endpoint     | Description             |
| ------ | ------------ | ----------------------- |
| GET    | `/tasks`     | Get all tasks           |
| POST   | `/tasks`     | Create a new task       |
| PUT    | `/tasks/:id` | Update an existing task |
| DELETE | `/tasks/:id` | Delete a task           |

---

## Installation

### Clone the Repository

```bash
git clone https://github.com/iamanujosh/task-manager.git
cd task-manager
```

### Backend Setup

```bash
cd backend
npm install
npm start
```

Backend runs on:

```text
http://localhost:5000
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```



## Future Enhancements

* MongoDB integration
* User authentication
* Task categories
* Search and filtering
* Due dates and reminders
* Drag-and-drop task management

---

## Author

**Anushka Joshi**

* GitHub: https://github.com/iamanujosh
* Email: [joshi2017anu@gmailcom](mailto:joshi2017anu@gmailcom)
