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


## Admin & User Login

This MERN application supports **Admin** and **User** roles with secure, role-based access.

### User Login
Users can browse products, place orders, and view their order history.  
**Login URL:** https://mern.austinmasamhiri.com/login  

**Demo User Credentials:**
- Email: user@demo.com  
- Password: Password123  

### Admin Login
Admins can access the admin dashboard to manage products and orders.  
**Login URL:** https://mern.austinmasamhiri.com/admin/login  

**Demo Admin Credentials:**
- Email: admin@demo.com  
- Password: admin123  

### Authentication
- JWT-based authentication
- Protected routes with role-based authorization

  
  ## Setup Instructions

This repository contains three main parts:
- Backend (API)
- Frontend (User)
- Frontend (Admin)

Follow the steps below to run the project locally.

## Clone the Repository

Clone the project and navigate into the root directory:

    ```bash
    git clone https://github.com/ausiemass1/ecommerce-MERN.git
    cd ecommerce-MERN

    ```
---

## Backend Setup

1. Navigate to the backend folder:
   ````
   cd backend
   npm install

    ````

2.  Create a `.env` file and configure it using the .env.example  as shown below:


    ````
    NODE_ENV=
    PORT=4000

    # session secret
    JWT_SECRET=
    CLIENT_URL=

    # Mongo Database login
    MONGO_URL=
    PASSWORD=

    # AWS login to S3 bucket
    AWS_ACCESS_KEY_ID=  
    AWS_SECRET_ACCESS_KEY=
    AWS_REGION=
    AWS_S3_BUCKET=

    # Checkout with Stripe
    STRIPE_SECRET_KEY=
    STRIPE_PUBLISHABLE_KEY=
    STRIPE_WEBHOOK_SECRET=

    # Redis for cart management
    UPSTASH_REDIS_REST_URL=
    UPSTASH_REDIS_REST_TOKEN=

    ````

3.  Start the backend server:

    `npm run dev`

4. The backend app will run on http://localhost:5000


## Frontend Setup (User)

1.  Navigate to the user frontend directory:

    `cd frontend`


2.  Install dependencies:

    `npm install`


3.  Create a .env file:

VITE_API_BASE_URL=http://localhost:4000


4.  Start the development server:

    `npm run dev`


User application runs at: http://localhost:5173/login


## Frontend Setup (Admin)

1.  Navigate to the admin frontend directory:

    `cd admin`


2.  Install dependencies:

    `npm install`


3.  Create a .env file:

    `VITE_API_BASE_URL=http://localhost:5000`


4.  Start the development server:

    `npm run dev`


    Admin dashboard runs at:

    `http://localhost:5173/admin/login`

   # Notes

    - Ensure MongoDB is running before starting the backend.
    - Demo credentials are for testing purposes only.
    - The project showcases real-world MERN functionality, including authentication, payments, pagination, and admin management.


# 👨‍💻 Author

Austin Masamhiri
Full-Stack Developer
MERN • TypeScript • Cloud-Ready Applications

 