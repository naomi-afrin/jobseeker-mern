# 💼 JobSeeker MERN App

**JobSeeker** is a full-stack job search platform built with the MERN stack (MongoDB, Express.js, React, Node.js). It allows users to explore companies, search for jobs, and apply with ease. This application was developed as part of an academic project.

> 👩‍💻 **Note:** I, *Naomi Afrin*, contributed only to the **backend development** of this project.

---

## 🖼 Homepage

![Homepage](images/homepage.png)

---

## 🛠 Tech Stack

- **MongoDB Atlas** – NoSQL cloud database
- **Express.js** – RESTful API backend
- **React** – Frontend user interface
- **Node.js** – Server runtime environment
- **Vite** – Fast frontend bundler
- **Tailwind CSS** – Utility-first CSS framework
- **JWT** – Authentication

---

## 🚀 Features

- User registration and login
- Company and job listings
- Role-based access control (admin/user)
- Filter and search jobs by category, location, and type
- Backend API for managing jobs, users, and applications

---

## 📁 Project Structure

```
jobseeker-mern/
│
├── images/               # Screenshots and UI images
│   └── homepage.png
│
├── backend/              # Node.js + Express API
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── .env
│
├── frontend/             # React + Vite App
│   ├── src/
│   ├── public/
│   └── .env
│
└── README.md
```

---

## ⚙ Setup Instructions

### 🔹 Backend

```bash
cd backend
npm install
```

Create a `.env` file in `backend/` with:

```env
PORT=4000
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-jwt-secret
```

Then start the backend server:

```bash
npm start
```

---

### 🔹 Frontend

```bash
cd frontend
npm install
```

Create a `.env` file in `frontend/` with:

```env
VITE_API_URL=http://localhost:4000
```

Then start the frontend dev server:

```bash
npm run dev
```

---

## 👩‍💻 Developer Contribution

This project was developed by a team of students for a CSE471 course.

I, **Naomi Afrin Jalil**, worked exclusively on the **backend**, focusing on:

- Building RESTful APIs
- JWT-based authentication
- MongoDB Atlas integration
- User and job management endpoints

---


