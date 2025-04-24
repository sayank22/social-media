<p align="center">
  <a href="https://silentpost-client.vercel.app/">
    <img src="assets/silentpost-logo.png" alt="SilentPost Logo" width="200" />
  </a>
</p>

<br />
<div align="center">

# SilentPost

<p align="center">
  A secure, anonymous social media platform built with Node.js and React.
  <br />
  <a href="https://github.com/sayank22/SilentPost"><strong>Explore the Docs »</strong></a>
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

## 📝 About SilentPost

SilentPost is a social media platform that allows users to share posts anonymously, engage through reactions, and manage personal profiles—all within a secure, JWT-authenticated environment.

---

## 🔧 Tech Stack

- **Frontend:** React, HTML, CSS, Bootstrap  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **Authentication:** JWT (JSON Web Tokens)  

---

## 🚀 Key Features

- ✅ User Authentication with JWT  
- 📝 Create and Delete Posts  
- 💬 Toggle Reactions on Posts  
- 👤 Personal User Profiles  
- 📱 Fully Responsive Design  

---

## 📂 Backend Structure

backend/ ├── controllers/ │ ├── postController.js │ └── userController.js ├── middleware/ │ └── authMiddleware.js ├── models/ │ ├── postModel.js │ └── user.js ├── routes/ │ ├── postRoutes.js │ └── userRoutes.js ├── .env ├── app.js └── server.js


---

## 📌 API Endpoints

### 🔐 Authentication

- `POST /api/users/signup` – Register new users  
- `POST /api/users/login` – Login and receive a JWT  

### 🧾 Posts

- `GET /api/posts/` – Get all posts  
- `GET /api/posts/:id` – Get a specific post by ID  
- `POST /api/posts/` – Create a new post (auth required)  
- `DELETE /api/posts/:id` – Delete your post (auth required)  
- `POST /api/posts/:id/toggle-reaction` – Like/Unlike a post (auth required)  
- `GET /api/posts/user/:userId` – Get posts by specific user (auth required)  

---

## 🛠️ Getting Started

### Prerequisites

```bash
# Clone the repo
git clone https://github.com/sayank22/SilentPost.git

# Go into the backend directory
cd SilentPost/backend

# Install dependencies
npm install

# Start the server
npm run dev


👨‍💻 About the Developer
Sayan Kundu – A 23-year-old CSE student from Netaji Subhash Engineering College, passionate about real-world web development and building engaging user-centric apps.

📧 Email: sayank10023@gmail.com

🔗 LinkedIn

🐱 GitHub