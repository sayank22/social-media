# SilentPost – Frontend

  <div align="center"> <a href="https://silentpost-client.vercel.app/"> <img src="../frontend/src/assets/tagline.png" alt="SilentPost Logo" width="200" /> </a> <p> A secure, anonymous social media platform frontend built with React, Bootstrap, and Vite. </p>
<a href="https://github.com/sayank22/social-media"><strong>Explore the Docs »</strong></a>

</div>

---

<br />
<div align="center">

## 📝 About SilentPost

SilentPost is a social media platform that allows users to share posts anonymously, engage through reactions, and manage personal profiles—all within a secure, JWT-authenticated environment.

---

## 🛠️ Frontend Tech Stack

- ⚛️ **React.js**
- 🧰 **CSS** + **Bootstrap**
- 🎨 **TailWind CSS**
- 🛣️ **React Router**
- 🌐 **Axios** – for backend API requests
- 🗂️ **Context API + Reducer** – for state management
- ⚡ **Vite** – for lightning-fast development and builds

---

## ✨ Key Features

- 🔐 JWT-based user authentication
- 📝 Create and delete posts anonymously
- 💬 Toggle reactions (like) per user
- 🧭 Navigation via React Router
- 📱 Fully responsive and mobile-friendly
- 🗂️ Context + Reducer based global state

---

## 📁 Folder Structure

frontend/
├── public/
├── src/
│   ├── api/
│   │   └── userApi.js
│   ├── assets/
│   ├── components/
│   │   ├── ConfirmModal.jsx
│   │   ├── CreatePost.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── Post.jsx
│   │   ├── PostList.jsx
│   │   ├── RedirectWithState.jsx
│   │   ├── RequireAuth.jsx
│   │   └── Sidebar.jsx
│   ├── pages/
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── CreatePost.jsx
│   │   ├── Login.jsx
│   │   ├── Profile.jsx
│   │   └── Signup.jsx
│   ├── store/
│   │   ├── AuthContext.jsx
│   │   ├── post-list-store.js
│   ├── styles/
│   │   └── App.css
│   ├── App.jsx
│   ├── AppRoutes.jsx
│   ├── ErrorBoundary.jsx
│   └── main.jsx
├── .env
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
└── README.md


---

## 🌐 Live Links

- 🔗 Frontend: [silentpost-client.vercel.app](https://silentpost-client.vercel.app)
- 🔗 Backend API: [silentpost-server.onrender.com](https://silentpost-server.onrender.com)

---

## ⚙️ Environment Variables

Create a `.env` file in the `frontend/` directory:

```env
VITE_API_URL=https://silentpost-server.onrender.com


Prerequisites
Ensure Node.js and Vite are installed.

Local Development

# Clone the repository
git clone https://github.com/sayank22/SilentPost.git

# Navigate into the frontend directory
cd SilentPost/frontend

# Install frontend dependencies
npm install

# Start the local development server
npm run dev

Open http://localhost:5173 to view the app in your browser.

📦 Building for Production
To build the app for deployment:

npm run build

This will generate a dist/ folder with optimized production-ready static files. You can deploy it using Vercel, Netlify, or any static hosting service.

🌐 Live Project Links
🎯 Frontend: silentpost-client.vercel.app

🔙 Backend API: silentpost-server.onrender.com

📬 Contact the Developer
👨‍💻 Sayan Kundu

<div align="center">

📧 <a href="mailto:sayank10023@gmail.com">sayank10023@gmail.com</a>  
💼 <a href="https://www.linkedin.com/in/sayan-kundu-70b5442b6/">LinkedIn</a>  
🐙 <a href="https://github.com/sayank22">GitHub</a>

</div>


<div align="center"> Designed & Developed with ❤️ by Sayan Kundu </div>