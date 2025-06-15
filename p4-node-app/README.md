# MotoHunt 🏍️

MotoHunt is a fullstack web application where users can browse, search, and manage motorcycles. Built using React, Node.js, Express, and MongoDB.

---

## 🚀 Tech Stack

**Frontend:**
- React.js
- Tailwind CSS
- Axios (API requests)
- React Router

**Backend:**
- Node.js
- Express.js
- MongoDB (with Mongoose)
- JWT Authentication
- CORS
- Multer

**Database:**
- MongoDB Atlas

---

## ✨ Features

- 🔐 User Authentication (JWT)
- 📄 CRUD Operations for Motorcycle Listings
- 🔎 Search & Filter functionality
- 📱 Fully Responsive UI
- 🖼 Image Uploads
- 🚀 RESTful API

---

## 📁 Project Structure

/frontend (React app)
/backend (Express server)

---

## 🛠 Environment Variables

Before running the backend server, create a `.env` file in the `/backend` directory and add the following variables:

```env
PORT=3000
MONGO_URL=mongodb://localhost:27017/motohuntDB
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email_here
EMAIL_PASS=your_email_password_here
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

## ⚙️ Installation

### 1️⃣ Clone the repository

```
git clone https://github.com/your-username/motohunt.git

cd backend
npm install
npm run dev

cd ../frontend
npm install
npm run dev

```