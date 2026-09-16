# MERN E-Commerce Website

A full-stack e-commerce web application built with MongoDB, Express.js, React.js, and Node.js.

## Features

- User registration & login with JWT authentication
- Role-based access control (customer / admin)
- Product browsing with search and category filter
- Shopping cart (add, update quantity, remove)
- Checkout and order placement
- Order history and order detail view
- Admin dashboard: add/delete products, manage order status

## Tech Stack

- **Frontend:** React.js, React Router, Axios, Context API
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Auth:** JWT + bcrypt for password hashing

## Folder Structure

```
ecommerce-mern/
├── backend/
│   ├── config/db.js
│   ├── models/         (User, Product, Cart, Order)
│   ├── middleware/auth.js
│   ├── controllers/    (auth, product, cart, order)
│   ├── routes/         (auth, product, cart, order)
│   ├── server.js
│   └── .env.example
└── frontend/
    ├── public/index.html
    └── src/
        ├── api/axios.js
        ├── context/    (AuthContext, CartContext)
        ├── components/ (Navbar, ProductCard, ProtectedRoute)
        ├── pages/       (Home, ProductDetail, Login, Register, Cart, Checkout, Orders, OrderDetail, Admin)
        ├── App.js
        └── index.js
```

## Setup Instructions

### Prerequisites
- Node.js (v16+)
- MongoDB (local install or MongoDB Atlas account)

### 1. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env and set your MONGO_URI and JWT_SECRET
npm run dev
```

Backend runs on `http://localhost:5000`

### 2. Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
npm start
```

Frontend runs on `http://localhost:3000`

### 3. Create an Admin User

By default, all registered users get the `customer` role. To make a user admin,
either:
- Manually update the user's `role` field to `"admin"` in MongoDB (using MongoDB Compass or shell), or
- Add a temporary script/route to promote a user (recommended: do this once, then remove it).

## API Endpoints

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | /api/auth/register | Public | Register new user |
| POST | /api/auth/login | Public | Login user |
| GET | /api/auth/profile | Private | Get logged-in user profile |
| GET | /api/products | Public | Get all products (search, filter, pagination) |
| GET | /api/products/:id | Public | Get single product |
| POST | /api/products | Admin | Create product |
| PUT | /api/products/:id | Admin | Update product |
| DELETE | /api/products/:id | Admin | Delete product |
| GET | /api/cart | Private | Get user's cart |
| POST | /api/cart | Private | Add item to cart |
| PUT | /api/cart/:productId | Private | Update cart item quantity |
| DELETE | /api/cart/:productId | Private | Remove item from cart |
| POST | /api/orders | Private | Place an order |
| GET | /api/orders/my-orders | Private | Get logged-in user's orders |
| GET | /api/orders/:id | Private | Get order by ID |
| GET | /api/orders | Admin | Get all orders |
| PUT | /api/orders/:id/status | Admin | Update order status |

## Notes

- Passwords are hashed using bcrypt before storing.
- JWT token is stored in `localStorage` on the frontend and sent via `Authorization: Bearer <token>` header.
- This is a learning/portfolio project — for production use, add rate limiting, input validation (e.g. Joi/Zod), HTTPS, and a payment gateway (Razorpay/Stripe) instead of the placeholder payment method field.
