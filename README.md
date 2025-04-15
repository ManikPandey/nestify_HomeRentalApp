# 🏡 Nestify – Home Rental Web App

**Live Demo:** [Nestify on Render](https://nestify-homerentalapp.onrender.com/listings)  
**GitHub Repo:** [ManikPandey/nestify_HomeRentalApp](https://github.com/ManikPandey/nestify_HomeRentalApp)

> A full-stack, Airbnb-style home rental platform built with Node.js, Express, MongoDB, and EJS — featuring authentication, cloud image uploads, session handling, and RESTful routing.

---

## 🚀 Features

- 🏘️ **List, View, and Rent Homes** – Users can browse or post rental listings with details and images.
- 🔐 **Authentication & Authorization** – Secure login/signup using Passport.js with role-based access.
- ☁️ **Cloud Image Uploads** – Integrated with Cloudinary for smooth media handling.
- 💬 **Flash Messaging** – Instant feedback on user actions (login, logout, errors, etc.).
- 🌐 **RESTful Routing** – Clean structure using Express Router and controller-based logic.
- 🧠 **Schema Validation** – Joi used to validate user inputs and prevent malformed data.
- 🏗 **MVC Architecture** – Models, Views, and Controllers organized for scalability and readability.
- 📦 **Deploy Ready** – Hosted on Render, with MongoDB Atlas as the backend database.

---

## 🧰 Tech Stack

**Frontend:**
- EJS templating engine
- CSS (custom styling)

**Backend:**
- Node.js + Express.js
- MongoDB + Mongoose
- Passport.js for authentication
- Multer & Cloudinary for image upload

**Key Packages:**
```json
"cloudinary", "connect-flash", "connect-mongo", "dotenv", "ejs", "ejs-mate",
"express", "express-session", "joi", "method-override", "mongoose",
"multer", "multer-storage-cloudinary", "passport", "passport-local",
"passport-local-mongoose"


// project structure 
📦 nestify_HomeRentalApp
├── controller/               # All route logic
├── models/                  # Mongoose schemas
├── public/                  # Static files (CSS, images, JS)
├── routes/                  # Route definitions
├── uploads/                 # Multer-uploaded temp files
├── utils/                   # Helper functions
├── views/                   # EJS templates
├── app.js                   # Entry point
├── cloudConfig.js           # Cloudinary config
├── middleware.js            # Custom middlewares
├── schema.js                # Joi validation schemas
├── .gitignore
├── package.json
└── README.md

## 📌 Getting Started

1️⃣ Clone the Repo
git clone https://github.com/ManikPandey/nestify_HomeRentalApp.git
cd nestify_HomeRentalApp

2️⃣ Install Dependencies
npm install

3️⃣ Set Up .env File
DB_URL=your_mongodb_atlas_url
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_KEY=your_key
CLOUDINARY_SECRET=your_secret

4️⃣ Run the Server
node app.js


Inspiration
Nestify is inspired by Airbnb and built as a full-stack learning project, implementing all important Web Dev concepts including:
Authentication & Authorization
REST APIs
Cloud Integration
Scalable Folder Structure
MVC Architecture

🌍 Deployment
✅ Render for server and frontend
✅ MongoDB Atlas for cloud database
✅ Cloudinary for media storage

🙌 Author
👨‍💻 Manik Pandey
📎 GitHub – ManikPandey

---

Let me know if you'd like to add:
- Screenshots or demo gifs
- Contribution guide
- API documentation  
Happy deploying! 🚀