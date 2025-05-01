# SilentPost – Social-Media

<div align="center"> <a href="https://silentpost-client.vercel.app/"> <img src="../frontend/src/assets/tagline.png" alt="SilentPost Logo" width="200" /> </a> <p> A secure, anonymous social media platform frontend built with React, Bootstrap, and Vite. </p>
<a href="https://github.com/sayank22/social-media"><strong>Explore the Docs »</strong></a>

</div>

---

<br />
<div align="center">

## 📝 About SilentPost

SilentPost is a social media platform that allows users to share posts anonymously, engage through reactions, and manage personal profiles—all within a secure, JWT-authenticated environment.

---

## 🛠️ Tech Stack

**Frontend:**
- React
- CSS
- Tailwind CSS
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


1. Clone the Repo

```bash
git clone https://github.com/sayank22/SilentPost.git
cd SilentPost

2. Setup Backend

cd backend
npm install

Create a .env file in the backend/ directory:
PORT=5000
CONNECTION_STRING(MONGODB_URI)=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

Run the backend server:
node app.js

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
Sayan Kundu – A final-year CSE student, passionate about building meaningful full-stack applications and exploring modern web technologies.

📬 Contact the Developer
👨‍💻 Sayan Kundu

<div align="center">

📧 <a href="mailto:sayank10023@gmail.com">sayank10023@gmail.com</a>  
💼 <a href="https://www.linkedin.com/in/sayan-kundu-70b5442b6/">LinkedIn</a>  
🐙 <a href="https://github.com/sayank22">GitHub</a>

</div>

<div align="center"> Designed & Developed with ❤️ by Sayan Kundu </div>