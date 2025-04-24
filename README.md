# SilentPost - social-media

<p align="center">
  <a href="https://silentpost-client.vercel.app/">
    <img src="frontend/assets/silentpost-logo.png" alt="SilentPost Logo" width="200" />
  </a>
</p>

<br />
<div align="center">

# SilentPost

<p align="center">
  An anonymous and responsive social media platform built with the MERN stack. Users can post anonymously, react to others’ thoughts, and manage accounts securely with JWT-based authentication.
  <br />
  <a href="https://github.com/sayank22/SilentPost"><strong>Explore the Full Project »</strong></a>
  <br />
  <br />
  <a href="https://silentpost-client.vercel.app">Live Demo</a>
  ·
  <a href="https://github.com/sayank22/SilentPost/issues">Report Bug</a>
  ·
  <a href="https://github.com/sayank22/SilentPost/issues">Request Feature</a>
</p>

</div>

---

## 📦 Project Overview

SilentPost is a full-stack anonymous social media platform that supports account authentication, post creation/deletion, and reaction toggling. Built with a React frontend and Node.js + Express backend, the app stores data in MongoDB and manages secure auth using JWT.

---

## 🛠️ Tech Stack

**Frontend:**
- React
- CSS
- Bootstrap
- React Router
- Axios
- Vite
- Context API + Reducer

**Backend:**
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT for Authentication
- dotenv, cors, bcrypt

---

## ✨ Core Features

- 🔐 JWT Authentication (Signup/Login)
- 📝 Create, View, and Delete Posts
- 💬 React to Posts (1 reaction/user)
- 🧠 Anonymous Posting System
- 📱 Fully Responsive UI (mobile + desktop)
- 🛣️ Protected Routes and State Management

---

## 🌐 Live Links

- 🔗 Frontend: [silentpost-client.vercel.app](https://silentpost-client.vercel.app)
- 🔗 Backend API: [silentpost-server.onrender.com](https://silentpost-server.onrender.com)

---

## 📁 Project Structure

SilentPost/ ├── frontend/ # React frontend │ ├── src/ │ ├── public/ │ ├── .env # VITE_API_URL │ └── ... ├── backend/ # Node.js + Express backend │ ├── controllers/ │ ├── models/ │ ├── routes/ │ ├── .env # MONGODB_URI, JWT_SECRET │ └── ... ├── README.md # This file


---

## 🚀 Getting Started

### Prerequisites

Make sure you have:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/) (local or Atlas)

---

### 🔧 Setup Instructions

#### 1. Clone the Repo

```bash
git clone https://github.com/sayank22/SilentPost.git
cd SilentPost

2. Setup Backend

cd backend
npm install

Create a .env file in the backend/ directory:
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

Run the backend server:
npm run dev

3. Setup Frontend

cd ../frontend
npm install

Create a .env file in the frontend/ directory:
VITE_API_URL=https://silentpost-server.onrender.com

Run the development server:
npm run dev

Open http://localhost:5173 to view it in your browser.

🧪 Testing the App
Signup/Login from the homepage

Create a new anonymous post

Toggle reaction on any post

View your own posts via user-based API

👨‍💻 About the Developer
Sayan Kundu – A final-year CSE student from Netaji Subhash Engineering College, passionate about building meaningful full-stack applications and exploring modern web technologies.

📧 Email: sayank10023@gmail.com
💼 LinkedIn: linkedin.com/in/sayan-kundu-70b5442b6
🐱 GitHub: @sayank22

