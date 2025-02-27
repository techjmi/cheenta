
# Cheenta Blog Application

A full-stack blog application built with the **MERN (MongoDB, Express.js, React.js, Node.js)** stack. Users can create, edit, and delete blogs, comment on posts, and manage their profiles.

## 🌐 Live Demo
🔗 [Cheenta Blog](https://cheenta.onrender.com/)

## 📂 Folder Structure
cheenta/ │── client/ # React frontend │ ├── public/
│ ├── src/ │ │ ├── components/ # Reusable UI components │ │ ├── context/ # Data provider │ │ ├── pages/ # Pages (Login, Home, BlogDetails, etc.) │ │ ├── service/ # API services (user, blog, comments) │ │ ├── skeleton/ # Loading skeletons │ │ ├── App.js
│ │ ├── index.js
│ └── package.json
│ │── server/ # Node.js backend │ ├── controller/ # Controllers (blog, user) │ ├── db/ # Database connection │ ├── middleware/ # Middleware (auth verification) │ ├── models/ # Mongoose schemas │ ├── routes/ # API routes │ ├── index.js # Server entry point │ ├── package.json
│ └── README.md

## 🛠️ Tech Stack
- **Frontend:** React.js, React Router, Tailwind CSS  
- **Backend:** Node.js, Express.js, MongoDB  
- **Authentication:** JWT  
- **Deployment:** Render  

## 📌 Features
- **User Authentication** (Sign Up, Login, Logout)
- **Create, Update, Delete Blogs**
- **Comment System** (Add, Delete Comments)
- **Like Blogs**
- **Profile Management**
- **Search Blogs**

## 🚀 Installation
### 1️⃣ Clone the Repository
```bash
git clone https://github.com/techjmi/cheenta.git
cd cheenta
2️⃣ Install Dependencies
Frontend
bash
Copy
Edit
cd client
npm install
npm start
Backend
cd server
npm install
npm start
📡 API Endpoints
Authentication
POST /api/auth/signup - Register a new user
POST /api/auth/signin - Login user
Blogs
POST /api/blog - Create a blog (Auth Required)
GET /api/blog - Get all blogs
GET /api/blog/my-blogs - Get user's blogs
GET /api/blog/:id - Get a blog by ID
PUT /api/blog/:id - Update blog (Auth Required)
DELETE /api/blog/:id - Delete blog (Auth Required)
POST /api/blog/:id/like - Like a blog (Auth Required)
Comments
POST /api/comments - Add a comment
GET /api/comments - Get comments
DELETE /api/comments - Delete comment
🤝 Contribution
Feel free to fork this repo and contribute!

📜 License
MIT License © 2025 Md Shamim Akhter