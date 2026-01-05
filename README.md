# 🛒 MERN E-Commerce Platform (TypeScript)

A full-stack **MERN e-commerce application** built with **TypeScript**, featuring a user storefront, an admin dashboard, AWS S3 image uploads, and production-ready SPA routing.

---

## 🚀 Features

### 👤 User Application
- Browse products
- View product details
- Shopping cart
- Checkout flow
- User authentication
- Responsive UI (Materialize CSS)

### 🛠 Admin Dashboard
- Secure admin routes
- Create, update, delete products
- Upload product images to **AWS S3**
- Separate Admin SPA (`/admin`)
- React Router navigation

### 🔧 Backend API
- Express + TypeScript
- RESTful API architecture
- MongoDB with Mongoose
- Multer + multer-s3 for image uploads
- Environment-based configuration
- CORS enabled

---

## 🧱 Tech Stack

### Frontend
- React (Vite)
- TypeScript
- React Router
- Axios
- Materialize CSS

### Backend
- Node.js
- Express
- TypeScript
- MongoDB + Mongoose
- Multer & multer-s3
- AWS SDK (S3)

### Deployment
- cPanel Node.js Application
- AWS S3 (image storage)
- SPA routing support
- Environment variables (`.env`)

---

## ☁️ AWS S3 Image Uploads

Product images are uploaded to **AWS S3** using `multer-s3`.

### Required Environment Variables

````
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=your_region
AWS_S3_BUCKET_NAME=your_bucket_name
````


# 👨‍💻 Author

Austin Masamhiri
Full-Stack Developer
MERN • TypeScript • Cloud-Ready Applications